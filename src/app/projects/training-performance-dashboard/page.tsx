import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrainingHeader from "@/components/training/TrainingHeader";
import IndicatorBand from "@/components/training/IndicatorBand";
import { StaleNotice, UnavailableNotice } from "@/components/training/DataNotice";
import DashboardSection from "@/components/training/DashboardSection";
import HowItsBuilt from "@/components/training/HowItsBuilt";
import { hoursSince, summarize } from "@/lib/training/derive";
import { formatTimestamp } from "@/lib/training/format";
import { loadDashboard } from "@/lib/training/load";
import { buildChartData } from "@/lib/training/weekly";

// Keep in sync with REVALIDATE_SECONDS in lib/training/load.ts (must be a literal).
export const revalidate = 3600;

const title = "Training Performance Dashboard — Ahmet Can Özdemir";
const description =
  "A live dashboard of my own training data: a nightly Google Cloud pipeline turns Strava activities into training load, fitness and VDOT.";
const path = "/projects/training-performance-dashboard";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    url: path,
    siteName: "Ahmet Can Özdemir",
    locale: "en_US",
    type: "article",
  },
  twitter: { title, description },
};

export default async function TrainingDashboardPage() {
  const result = await loadDashboard();
  const summary = result.ok ? summarize(result.data, new Date()) : null;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <TrainingHeader />

        {!result.ok && <UnavailableNotice reason={result.reason} />}
        {summary?.stale && (
          <StaleNotice
            updated={formatTimestamp(summary.generatedAt)}
            days={Math.floor(hoursSince(summary.generatedAt, new Date()) / 24)}
          />
        )}

        {summary && (
          <div className="mt-10">
            <IndicatorBand summary={summary} />
          </div>
        )}

        {result.ok && summary && (
          <DashboardSection
            chartData={buildChartData(result.data)}
            loadSeriesStart={summary.loadSeriesStart}
          />
        )}
        <HowItsBuilt />
      </main>
      <Footer />
    </>
  );
}
