import { request, Request, Response } from "express";

const headers = {
  Accept: "*/*",
  "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
  Connection: "keep-alive",
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  Cookie:
    'cc_cookie={"level":["necessary","analytics","targeting","social-media"],"revision":0,"data":null,"rfc_cookie":false}; nette-browser=uxrqtzkvcu; PHPSESSID=nel19pbq0ihpg2854r6l3t19b5',
};

const body =
  "competitionsStage=88652&do=competitionsTableList-competitionsStageFilter-form-submit&";

const getUrl = (year: string) =>
  `https://stredocesky.ceskyhokej.cz/tabulky?competitionsTableList-seasonFilter-season-id=${year}-${
    Number(year) + 1
  }`;

export const fetchPosition = async (req: Request, res: Response) => {
  try {
    const year = req.query.year as string;
    const response = await fetch(getUrl(year), {
      method: "POST",
      headers,
      body,
    });
    const data = await response.text();

    return data;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Couldn't get data form https://stredocesky.ceskyhokej.cz/",
    });
  }
};
