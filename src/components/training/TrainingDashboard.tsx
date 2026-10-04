"use client";

import { useState } from "react";

import { periodStart, type ChartData, type Period } from "@/lib/training/weekly";

import DistanceChart from "./charts/DistanceChart";
import Filters, { type ActivityFilter } from "./charts/Filters";
import FormFitnessChart from "./charts/FormFitnessChart";
import HeartRateChart from "./charts/HeartRateChart";
import PaceChart from "./charts/PaceChart";
import VdotChart from "./charts/VdotChart";
import WeeklyLoadChart from "./charts/WeeklyLoadChart";

export default function TrainingDashboard({ data }: { data: ChartData }) {
  const [period, setPeriod] = useState<Period>("12w");
  const [activity, setActivity] = useState<ActivityFilter>("all");

  const latestWeek = data.weeks[data.weeks.length - 1]?.week;
  const start = latestWeek ? periodStart(period, latestWeek) : null;
  const weeks = start ? data.weeks.filter((week) => week.week >= start) : data.weeks;
  const form = start ? data.form.filter((point) => point.date >= start) : data.form;

  return (
    <div className="mt-12">
      <Filters
        period={period}
        activity={activity}
        onPeriodChange={setPeriod}
        onActivityChange={setActivity}
      />
      <div className="mt-10 space-y-14">
        <FormFitnessChart points={form} />
        <div className="grid gap-x-12 gap-y-14 md:grid-cols-2">
          <WeeklyLoadChart weeks={weeks} activity={activity} />
          <DistanceChart weeks={weeks} />
          <PaceChart weeks={weeks} />
          <HeartRateChart weeks={weeks} activity={activity} />
        </div>
        <VdotChart points={data.vdot} />
      </div>
    </div>
  );
}
