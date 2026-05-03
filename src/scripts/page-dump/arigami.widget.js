;(async function () {

  console.log(`[Arigami] widget.js loaded`);

  const queue = window.waitForArigamiAndRun || [];
  let initialized = false;
  let arigami, controller;

  const exec = fn => {
    try {
      fn?.({
        arigami,
        startWidget
      })
    } catch (e) {
      console.error('Arigami queue error:', e)
    }
  };

  window.waitForArigamiAndRun = fn => initialized ? exec(fn) : queue.push(fn);
  window.waitForArigamiAndRun.push = window.waitForArigamiAndRun;

  arigami = await import("https://w.arigami.io/v0/arigami.es.js");

  while (queue.length > 0) {
    const fn = queue.shift();
    exec(fn);
  }
  initialized = true;

  async function startWidget({
      element,
      token
  }) {

    console.log(`[Arigami] startWidget`, { element, token });

    token = getValidToken(token);

    console.log(`[Arigami] token`, token );

    try {

      if (!element) throw new Error("Element not found");
      if (!token) throw new Error("Token not found");

      const mountOptions = {
        container: element,
        productCardToken: token,
        instant: true
      };

      controller ??= await arigami.init({ enableAnalytics: true });
      controller.startWidget("mount", mountOptions);

      console.log(`[Arigami] Widget started`, {
        element,
        token,
        mountOptions
      });

    } catch (e) {
      console.error(`[Arigami] Widget error:`, e);
    }

  }

  function getValidToken(token) {

    const tokenDictionary = {
      "/pandora-wall-e-ac-22-kvt-home-edition-bez-kabelya/":
        "c0f7018a-5de0-4264-9cf6-ba35a0075d96",
      "/weiss-dragon-galaxy/": "904bf94a-710d-483c-a184-49263652a46e",
      "/zaryadnaya-stancziya-abb-terra-ac-w22-t-0-wallbox/":
        "83e225ba-0bf6-499f-a8c1-62279d737709",
      "/zaryadnaya-stancziya-autocharge-basic-dlb-dinamicheskaya-balansirovka-kabel-gbt/":
        "1ef76c70-ce1d-44e4-a6c4-a2cccca074a1",
      "/zaryadnaya-stancziya-autocharge-basic-dlb-dinamicheskaya-balansirovka-rozetka-t2/":
        "1ef76c70-ce1d-44e4-a6c4-a2cccca074a1",
      "/zaryadnaya-stancziya-autocharge-basic-dlb-dinamicheskaya-balansirovka-kabel-t2/":
        "1ef76c70-ce1d-44e4-a6c4-a2cccca074a1",
      "zaryadnaya-stancziya-orbis-viaris-uni-trexfaznaya-22-kvt-s-kabelem-t2-5-m-vyixod-schuko/":
        "66eeea9d-3766-4a26-8997-22c666911f26",
      "zaryadnaya-stancziya-orbis-viaris-uni-trexfaznaya-22-kvt-s-kabelem-5m/":
        "66eeea9d-3766-4a26-8997-22c666911f26",
      "zaryadnaya-stancziya-orbis-viaris-uni-230v-odnofaznaya-7-4-kvt-s-kabelem-t2-5-m/":
        "66eeea9d-3766-4a26-8997-22c666911f26",
      "/zaryadnaya-stancziya-orbis-viaris-uni-trexfaznaya-22-kvt-s-rozetkoj-t2/":
        "841f2ce9-35de-4e9f-9ec6-36e86eb612c8",
    }
  
    for (let urlPath in tokenDictionary) {
      if (window.location.href.includes(urlPath)) {
        token = tokenDictionary[urlPath]
        break
      }
    }

    return token;
  }

})()