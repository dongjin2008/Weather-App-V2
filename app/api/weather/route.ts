import toDay from "../../utils/toDay";
import toWeather from "../../utils/toWeather";
import { NextResponse } from "next/server";

export async function GET(request: Request)  { 
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const apiUrl = `https://api.open-meteo.com/v1/dwd-icon?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max&timezone=auto`

  const response = await fetch(apiUrl);
  const data = await response.json();

  const date: string[] = toDay(data.daily.time)
  const weather: string[] = toWeather(data.daily.weathercode)
  const temp = data.daily.temperature_2m_max

  const reult = {"date": date, "weather": weather, "temp": temp}
  return NextResponse.json(reult)
}