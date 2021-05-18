let timer;

export default {
  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCtP7PdpjONTp7WkdKzkcqv_hZbgL5Sb1M";
    if (mode == "signUp") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCtP7PdpjONTp7WkdKzkcqv_hZbgL5Sb1M";
    }
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();

    if (!response.ok) {
      console.log(responseData);
      const error = new Error(
        responseData.message || "Failed to authenticate. Check Login data!"
      );
      throw error;
    }
    console.log(responseData);

    const expiresIn = +responseData.expiresIn * 1000;
    //const expiresIn = 5000;
    const expirationTime = new Date().getTime() + expiresIn;

    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("tokenExpiration", expirationTime);

    timer = setTimeout(function() {
      context.dispatch("autoLogOut");
    }, expiresIn);

    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: expirationTime,
    });
  },
  async login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "logIn",
    });
  },
  async signUp(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signUp",
    });
  },
  autoLogIn(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn <= 0) {
      return;
    }

    timer = setTimeout(function() {
      context.dispatch("autoLogOut");
    }, expiresIn);

    if (token && userId && tokenExpiration) {
      context.commit("setUser", {
        token,
        userId,
        tokenExpiration,
      });
    }
  },
  logOut(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");

    clearTimeout(timer);

    context.commit("setUser", {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },
  autoLogOut(context) {
    context.dispatch("logOut");
    context.commit("setAutoLogOut");
  },
};
