import { Request, Response } from "express";

const getUrl = (season: string) =>
  `https://zapasy.ceskyhokej.cz/seznam-zapasu?filter%5Bseason%5D=${season}&filter%5BdateRange%5D=&filter%5BmanagingAuthorities%5D=all&filter%5Bregion%5D=all&filter%5Bteam%5D=1972&filter%5BtimeShortcut%5D=this-season&filter%5Bleague%5D=all&filter%5Bnumber%5D=&filter%5Bstadium%5D=all&filter%5Bstate%5D=&filter%5BteamType%5D=all&filter%5Bsort%5D=&filter%5Bdirection%5D=ASC`;

export const fetchMatches = async (req: Request, res: Response) => {
  try {
    const year = req.query.year as string;
    const response = await fetch(getUrl(year));
    const data = await response.text();

    return data;
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Couldnt get data form https://zapasy.ceskyhokej.cz" });
  }
};
