"use client";

import React from "react";
import DashboardSkeleton from "./overview-skeleton";

type OverViewLayoutType = {
  left: {
    firstCompnents: {
      heading: string;
      firstBox: React.JSX.Element;
      secondBox: React.JSX.Element;
      thirdBox: React.JSX.Element;
    };
    secondCompnents: {
      heading: string;
      firstBox: React.JSX.Element;
      secondBox: React.JSX.Element;
      thirdBox: React.JSX.Element;
    };
    thirdCompnent: {
      heading: string;
      firstBox: React.JSX.Element;
    };
  };
  right: {
    firstCompnents: {
      heading: string;
      calenderBox: React.JSX.Element;
    };
  };
  isPending?: boolean;
};

export default function OverViewLayout({
  left,
  right,
  isPending,
}: OverViewLayoutType) {
  if (isPending) {
    return <DashboardSkeleton />;
  }
  return (
    <main className="grid gap-6 md:grid-cols-[3fr_1.3fr]">
      {/* Left Section */}
      <section className="space-y-6">
        {/* Row 1 - 3 boxes */}
        <div>
          <h2 className="text-lg font-semibold mb-3">
            {left.firstCompnents.heading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {left.firstCompnents.firstBox}
            {left.firstCompnents.secondBox}
            {left.firstCompnents.thirdBox}
          </div>
        </div>

        {/* Row 2 - 2 + 1 layout */}
        <div>
          <h2 className="text-lg font-semibold mb-3">
            {left.secondCompnents.heading}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
            <div className="grid grid-cols-1 gap-4">
              {left.secondCompnents.firstBox}
              {left.secondCompnents.secondBox}
            </div>
            {left.secondCompnents.thirdBox}
          </div>
        </div>

        {/* Row 3 - list */}
        <div>
          <h2 className="text-lg font-semibold mb-3">
            {left.thirdCompnent.heading}
          </h2>
          {left.thirdCompnent.firstBox}
        </div>
      </section>

      {/* Right Section */}
      <section className="hidden md:block space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-3">
            {right.firstCompnents.heading}
          </h2>
          {right.firstCompnents.calenderBox}
        </div>
      </section>
    </main>
  );
}
