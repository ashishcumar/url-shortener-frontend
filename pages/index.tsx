import NW, { BaseUrl, EndPoint } from "@/helper/NWRequest";
import Utils from "@/helper/Utils";
import {
  Box_Shadow,
  Primary_Default,
  neutral500,
  neutral600,
  neutral700,
} from "@/helper/theme";
import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import easy from "@/assets/images/Easy.png";
import shortened from "@/assets/images/Shortened.png";
import secure from "@/assets/images/Secure.png";
import statistics from "@/assets/images/statistics.png";
import reliable from "@/assets/images/Reliable.png";
import devices from "@/assets/images/Devices.png";
import Image from "next/image";
import { alertShow } from "@/components/globalComponents/AppAlert";
import { ANALYTICS_OBJ } from "@/Interface/interface";

function Index() {
  const [link, setLink] = useState<string>("");
  const [redirectionLink, setRedirectionLink] = useState<string>("");
  const [shortCode, setShortCode] = useState<string>("");
  const [trackUrlShow, setTrackUrlShow] = useState<boolean>(false);
  const [clickDetailObj, setClickDetailObj] = useState<ANALYTICS_OBJ>();
  const [errText, setErrText] = useState<string>("");

  const USP = [
    {
      icon: easy,
      title: "Easy",
      content:
        "ShortURL is easy and fast, enter the long link to get your shortened link",
    },
    {
      icon: shortened,
      title: "Shortened",
      content: "Use any link, no matter what size, ShortURL always shortens",
    },
    {
      icon: secure,
      title: "Secure",
      content:
        "It is fast and secure, our service has HTTPS protocol and data encryption",
    },
    {
      icon: statistics,
      title: "Statistics",
      content: "Check the number of clicks that your shortened URL received",
    },
    {
      icon: reliable,
      title: "Reliable",
      content:
        "All links that try to disseminate spam, viruses and malware are deleted",
    },
    {
      icon: devices,
      title: "Devices",
      content: "Compatible with smartphones, tablets and desktop",
    },
  ];

  const getShortLink = async () => {
    if (!link.startsWith("https://")) {
      return alertShow({
        message: "invalida link",
        type: "error",
      });
    }
    const body = {
      url: link,
    };
    const res = await NW.Post(BaseUrl, EndPoint.GET_SHORT_URL, { body });
    if (res) {
      setRedirectionLink(`${BaseUrl}/${res.id}`);
    }
  };

  const getAnalytics = async () => {
    console.log("getAnalytics called");
    if (shortCode.length == 0) {
      return alertShow({
        message: "invalid short code",
        type: "error",
      });
    }
    const res = await NW.Get(BaseUrl, `${EndPoint.GET_ANALYTICS}${shortCode}`);
    if (res) {
      setClickDetailObj(res);
    } else {
      setErrText(res.error);
    }
  };

  return (
    <Grid sx={{ background: "#f9f9f9" }}>
      <Box
        sx={{
          padding: "24px",
          boxShadow: "0px 13px 44px -9px rgba(100,70,70,0.75)",
          // position:'fixed',
          // top:0,
          // left:0,
          // right:0,
        }}
      >
        <Typography
          sx={{
            typography: { xs: "font_32_600", md: "font_48_800" },
            textAlign: "center",
          }}
        >
          Short URL
        </Typography>
      </Box>

      {!trackUrlShow ? (
        <Box
          sx={{
            margin: "64px auto 48px auto",
            boxShadow: Box_Shadow,
            borderRadius: "4px",
            width: { xs: "80%", md: "50%" },
            padding: "24px",
            background: "white",
          }}
        >
          <Typography
            sx={{
              typography: { xs: "font_28_600", md: "font_32_600" },
              color: neutral700,
              textAlign: "center",
              margin: "24px 0",
            }}
          >
            Paste the URL to be shortened
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "24px 0",
            }}
          >
            <input
              type="text"
              placeholder="Enter the link here :- https://www.google.com"
              style={{
                height: "48px",
                width: "300px",
                padding: "0 24px",
                border: `1px solid #d6e3eb`,
              }}
              value={redirectionLink ? redirectionLink : link}
              readOnly={redirectionLink ? true : false}
              onChange={(e) => setLink(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{ height: "50px", borderRadius: "0" }}
              onClick={() => {
                redirectionLink ? Utils.handleSharing({}) : getShortLink();
              }}
              // onClick={redirectionLink ? Utils.handleSharing() : getShortLink}
            >
              {redirectionLink ? "Copy URL" : "Shorten URL"}
            </Button>
          </Box>
          {redirectionLink ? (
            <Typography
              sx={{
                typography: { xs: "font_16_600", md: "font_18_600" },
                textAlign: "center",
                color: neutral600,
              }}
            >
              Long URl:-
              <a style={{ color: Primary_Default }} href={link}>
                {link}
              </a>
            </Typography>
          ) : (
            <>
              <Typography
                sx={{
                  typography: { xs: "font_16_600", md: "font_18_600" },
                  textAlign: "center",
                  color: neutral600,
                }}
              >
                ShortURL is a free tool to shorten URLs and generate short links
              </Typography>
              <Typography
                sx={{
                  typography: { xs: "font_16_600", md: "font_18_600" },
                  textAlign: "center",
                  color: neutral600,
                }}
              >
                URL shortener allows to create a shortened link making it easy
                to share
              </Typography>
            </>
          )}
          {redirectionLink ? null : (
            <Button
              variant="contained"
              sx={{ margin: "12px auto", display: "block" }}
              onClick={() => setTrackUrlShow(true)}
            >
              Track Your Shortened URL
            </Button>
          )}
        </Box>
      ) : (
        <Box
          sx={{
            margin: "64px auto 48px auto",
            boxShadow: Box_Shadow,
            borderRadius: "4px",
            width: { xs: "80%", md: "50%" },
            padding: "24px",
            background: "white",
          }}
        >
          <Typography
            sx={{
              typography: { xs: "font_28_600", md: "font_32_600" },
              color: neutral700,
              textAlign: "center",
              margin: "24px 0",
            }}
          >
            Track Your Shortened URL
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "24px 0",
            }}
          >
            <input
              type="text"
              placeholder="Enter the shortcode"
              style={{
                height: "48px",
                width: "300px",
                padding: "0 24px",
                outline: "none",
                border: `1px solid #d6e3eb`,
              }}
              onChange={(e) => setShortCode(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{ height: "50px", borderRadius: "0" }}
              onClick={getAnalytics}
            >
              GET CLICKS
            </Button>
          </Box>
          {clickDetailObj || errText ? (
            <Box>
              <Typography sx={{ typography: "font_14_600", margin: "8px 0" }}>
                Total Clicks :-
                {clickDetailObj?.totalClicks
                  ? clickDetailObj.totalClicks
                  : errText}
              </Typography>
              {clickDetailObj?.visitHistory ? (
                <Box>
                  <Typography
                    sx={{
                      typography: "font_16_600",
                      margin: "8px 0",
                      color: neutral700,
                      textAlign:'center'
                    }}
                  >
                    Detailed View :-
                  </Typography>
                  {clickDetailObj.visitHistory.map((obj, i) => {
                    return (
                      <Typography
                        sx={{
                          typography: "font_14_400",
                          margin: "8px 0",
                          color: neutral500,
                          textAlign:'center'
                        }}
                        key={`typo${i}`}
                      >
                        {i + 1}. {new Date(obj.timeStamp).toDateString()}
                      </Typography>
                    );
                  })}
                </Box>
              ) : null}
            </Box>
          ) : null}
        </Box>
      )}

      <Box
        sx={{
          width: { xs: "80%", md: "50%" },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
          placeContent: "center",
          textAlign: "center",
          margin: "auto",
        }}
      >
        {USP.map((obj, i) => {
          return (
            <Box sx={{ margin: "12px" }} key={`box${i}`}>
              <Box>
                <Image src={obj.icon} alt={obj.title} height={40} width={40} />
              </Box>
              <Typography
                variant="font_16_600"
                sx={{ color: neutral700, margin: "12px 0" }}
              >
                {obj.title}
              </Typography>
              <Typography
                variant="font_14_600"
                sx={{ color: neutral500, margin: "12px 0" }}
              >
                {obj.content}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Grid>
  );
}

export default Index;
