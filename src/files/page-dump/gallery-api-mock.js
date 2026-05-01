(() => {
  const originalFetch = window.fetch ? window.fetch.bind(window) : null;
  const dataUrl = "files/page-dump/gallery-data.json";
  let galleryDataPromise = null;

  function normalizeImage(item) {
    if (typeof item === "string") {
      return { src: item, srcset: item };
    }

    if (!item || typeof item !== "object" || !item.src) {
      return null;
    }

    return {
      src: item.src,
      srcset: item.srcset || item.src,
    };
  }

  function collectFromDom() {
    const data = {};
    const cards = document.querySelectorAll("[data-hover-gallery][data-product-id]");

    cards.forEach((card) => {
      const productId = card.getAttribute("data-product-id");
      const img = card.querySelector("a img");

      if (!productId || !img || !img.getAttribute("src")) {
        return;
      }

      if (!data[productId]) {
        const src = img.getAttribute("src");
        data[productId] = [{ src, srcset: src }];
      }
    });

    return data;
  }

  async function loadGalleryData() {
    if (!galleryDataPromise) {
      galleryDataPromise = (async () => {
        const domData = collectFromDom();

        if (!originalFetch) {
          return domData;
        }

        try {
          const response = await originalFetch(dataUrl, { cache: "no-cache" });

          if (!response.ok) {
            return domData;
          }

          const json = await response.json();
          const merged = { ...domData };

          Object.keys(json || {}).forEach((id) => {
            if (!Array.isArray(json[id])) {
              return;
            }

            const normalized = json[id].map(normalizeImage).filter(Boolean);

            if (normalized.length) {
              merged[id] = normalized;
            }
          });

          return merged;
        } catch (_error) {
          return domData;
        }
      })();
    }

    return galleryDataPromise;
  }

  function jsonResponse(payload) {
    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }

  function parseUrl(input) {
    if (typeof input === "string") {
      return new URL(input, window.location.origin);
    }

    if (input instanceof Request) {
      return new URL(input.url, window.location.origin);
    }

    return new URL(String(input), window.location.origin);
  }

  window.fetch = async (input, init) => {
    const url = parseUrl(input);

    if (url.pathname === "/api/products/gallery/count") {
      const idsParam = url.searchParams.get("ids") || "";
      const ids = idsParam
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean);
      const data = await loadGalleryData();
      const result = {};

      ids.forEach((id) => {
        result[id] = Array.isArray(data[id]) ? data[id].length : 1;
      });

      return jsonResponse({ data: result });
    }

    const galleryMatch = url.pathname.match(/^\/api\/products\/(\d+)\/gallery$/);
    if (galleryMatch) {
      const productId = galleryMatch[1];
      const data = await loadGalleryData();
      return jsonResponse({ data: data[productId] || [] });
    }

    if (!originalFetch) {
      throw new Error("Fetch is not available in this browser");
    }

    return originalFetch(input, init);
  };
})();
