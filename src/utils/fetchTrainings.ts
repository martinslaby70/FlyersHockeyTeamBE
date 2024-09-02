import { Request, Response } from "express";

const getUrl = (day: string) =>
  `https://rozpis.rytirikladno.cz/?id_place=all&dayw=${day}`;

export const fetchTrainings = async (req: Request, res: Response) => {
  try {
    const day = req.query.day as string;
    const response = await fetch(getUrl(day));
    const data = await response.text();

    return data;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Couldn't get data form https://rozpis.rytirikladno.cz/",
    });
  }
};
