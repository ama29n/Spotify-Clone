const result = "#access_token=BQCeB3vcDsw_xZjMRM0BDC0-7K-F01rtxpYhpolMOUeIZkfETj503qdS42_hpbdpQAMOV__dvADfG_WCWgb-wALSm01YPYN7D8QKRWDmm7hQK0NFFzJD2s4u1Uk1M6IyBpqhG8yzoxYpNQ2jhUpj3wfqTBFcY6gMDpdjcDbO2O0SlA4tIoMn9EZ7bsAacah_TCeXGvRKo_5ciRmSRM-8iA&token_type=Bearer&expires_in=3600"
    .substring(1)
    .split("&")
    .reduce((initial, param) => {
        const [paramName, paramValue] = param.split("=");
        initial[paramName] = paramValue;
        return initial;
    }, {});

    console.log(result);