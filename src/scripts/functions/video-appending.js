export function videoAppending() {
  const videoCover = document.querySelectorAll("[data-video-id]");
  if (!videoCover.length) return;

  videoCover.forEach((el) => {
    const videoProps = {
      el: el,
      mute: "0",
      controls: el.getAttribute("data-controls") || "0",
      origin: window.location.origin.indexOf("localhost") < 0 ? window.location.origin : "",
      id: el.getAttribute("data-video-id") || null,
      width: el.getAttribute("data-width") || el.scrollWidth,
      height: el.getAttribute("data-height") || el.scrollHeight,
    };
    if (!videoProps.id) return;

    if (el.closest(".video_fullwidth")) {
      videoProps.mute = "1";
      window.addEventListener("load", () => appendVideo(videoProps));
      el.removeEventListener("click", appendVideo);
    }

    el.addEventListener("click", () => appendVideo(videoProps));
  });
}

function appendVideo(props) {
  const videoContainer = props.el.closest(".video__inner"),
    video = document.createElement("iframe");
  video.src =
    `https://www.youtube.com/embed/${props.id}?rel=0&disablekb=1&iv_load_policy=3` +
    `&mute=${props.mute}&autoplay=1&showinfo=0&controls=${props.controls}&enablejsapi=1&loop=1&modestbranding=1&playlist=${props.id}` +
    `&widgetid=1&origin=${props.origin}`;
  video.width = props.width;
  video.height = props.height;
  video.setAttribute(
    "allow",
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  );
  video.setAttribute("allowfullscreen", "1");
  videoContainer.appendChild(video);
  video.addEventListener("load", () => {
    video.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: "playVideo",
        args: [],
      }),
      "*"
    );
    props.el.classList.add("video__cover_hidden");
  });
}

// eslint-disable-next-line no-unused-vars
function callPlayer(func, args) {
  var iframes = document.getElementsByTagName("iframe");
  for (var i = 0; i < iframes.length; ++i) {
    if (iframes[i]) {
      var src = iframes[i].getAttribute("src");
      if (src) {
        if (src.indexOf("youtube.com/embed") != -1) {
          iframes[i].contentWindow.postMessage(
            JSON.stringify({
              event: "command",
              func: func,
              args: args || [],
            }),
            "*"
          );
        }
      }
    }
  }
}
