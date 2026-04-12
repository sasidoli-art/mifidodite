"use client";

import { useEffect, useState } from "react";
import { Cloud, CloudRain, Sun, CloudSun, CloudSnow, CloudLightning, Loader2 } from "lucide-react";

interface Props {
  lat: number;
  lng: number;
}

interface DailyForecast {
  date: string;
  tMax: number;
  tMin: number;
  code: number;
  precipProb: number;
}

function weatherIcon(code: number, size = 24) {
  if (code === 0) return <Sun size={size} className="text-amber-500" />;
  if (code <= 3) return <CloudSun size={size} className="text-amber-400" />;
  if (code <= 48) return <Cloud size={size} className="text-slate-400" />;
  if (code <= 67) return <CloudRain size={size} className="text-blue-500" />;
  if (code <= 77) return <CloudSnow size={size} className="text-sky-300" />;
  if (code <= 82) return <CloudRain size={size} className="text-blue-600" />;
  if (code >= 95) return <CloudLightning size={size} className="text-purple-500" />;
  return <Cloud size={size} className="text-slate-400" />;
}

function weatherLabel(code: number): string {
  if (code === 0) return "Sereno";
  if (code <= 3) return "Poco nuvoloso";
  if (code <= 48) return "Nuvoloso";
  if (code <= 67) return "Pioggia";
  if (code <= 77) return "Neve";
  if (code <= 82) return "Rovesci";
  if (code >= 95) return "Temporale";
  return "Variabile";
}

function dayLabel(date: string, idx: number): string {
  if (idx === 0) return "Oggi";
  if (idx === 1) return "Domani";
  const d = new Date(date);
  return d.toLocaleDateString("it-IT", { weekday: "short" }).replace(".", "");
}

export function MeteoWidget({ lat, lng }: Props) {
  const [forecast, setForecast] = useState<DailyForecast[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max&timezone=Europe/Rome&forecast_days=5`;
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (!data.daily) {
          setError(true);
          return;
        }
        const days: DailyForecast[] = data.daily.time.map((date: string, i: number) => ({
          date,
          tMax: Math.round(data.daily.temperature_2m_max[i]),
          tMin: Math.round(data.daily.temperature_2m_min[i]),
          code: data.daily.weathercode[i],
          precipProb: data.daily.precipitation_probability_max?.[i] ?? 0,
        }));
        setForecast(days);
      })
      .catch(() => setError(true));
  }, [lat, lng]);

  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-border p-5">
        <h3 className="font-bold text-foreground mb-2">Previsioni meteo</h3>
        <p className="text-sm text-muted-foreground">Meteo non disponibile al momento.</p>
      </div>
    );
  }

  if (!forecast) {
    return (
      <div className="bg-white rounded-2xl border border-border p-5">
        <h3 className="font-bold text-foreground mb-3">Previsioni meteo</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 size={16} className="animate-spin" /> Caricamento...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-border p-5">
      <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
        <Sun size={18} className="text-amber-500" /> Previsioni meteo
      </h3>
      <div className="grid grid-cols-5 gap-2">
        {forecast.map((d, i) => (
          <div key={d.date} className={`text-center p-2 rounded-xl ${i === 0 ? "bg-primary/5 border border-primary/20" : ""}`}>
            <div className="text-xs font-semibold text-muted-foreground capitalize mb-1">{dayLabel(d.date, i)}</div>
            <div className="flex justify-center mb-1">{weatherIcon(d.code, 20)}</div>
            <div className="text-xs text-foreground font-semibold">
              {d.tMax}° <span className="text-muted-foreground font-normal">/ {d.tMin}°</span>
            </div>
            {d.precipProb > 30 && (
              <div className="text-[10px] text-blue-600 mt-0.5">{d.precipProb}% 💧</div>
            )}
          </div>
        ))}
      </div>
      <p className="text-[10px] text-muted-foreground mt-3 text-center">Dati Open-Meteo.com</p>
    </div>
  );
}
