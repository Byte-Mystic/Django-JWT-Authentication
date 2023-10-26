import React, { useEffect } from "react";

const GoogleLoginCallback = () => {
  const handleGoogleLogin = () => {
    const clientId =
      "534552463083-bu6k1l16c9tbjh6u71eture9lkojt5ni.apps.googleusercontent.com";
    const redirectUri = "http://localhost:3000/v1/users/login/google/callback/";

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${encodeURIComponent(
      redirectUri
    )}&prompt=consent&response_type=code&client_id=${clientId}&scope=email&access_type=online`;

    window.location.href = authUrl;
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default GoogleLoginCallback;
