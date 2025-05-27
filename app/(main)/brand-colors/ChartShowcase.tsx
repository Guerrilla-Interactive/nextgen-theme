import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/features/unorganized-components/ui/card'; 
import { type BrandDefinition } from './brands'; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/features/unorganized-components/ui/tabs";


interface ChartShowcaseProps {
  brand: BrandDefinition;
  className?: string;
}

// Custom Tooltip for Recharts - now uses CSS variables
const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div 
        className="p-2 rounded-md shadow-lg" 
        style={{
          background: 'var(--tooltip-background)',
          color: 'var(--tooltip-color)',
          border: `var(--tooltip-border-width) var(--tooltip-border-style) var(--tooltip-border-color)`,
          borderRadius: 'var(--tooltip-border-radius)',
          padding: 'var(--tooltip-padding)',
          boxShadow: 'var(--tooltip-box-shadow)',
          fontSize: 'var(--tooltip-font-size)'
        }}
      >
        <p className="label font-semibold">{`${label}`}</p>
        {payload.map((pld: any, index: number) => (
          <p key={index} style={{ color: pld.fill || pld.color || 'var(--tooltip-color)' }}>
            {`${pld.name}: ${pld.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const shouldApplySpecialLayout = (brand: BrandDefinition): boolean => {
  return brand.stylingPreferences?.applySpecialLayout ?? false;
};

export const ChartShowcase: React.FC<ChartShowcaseProps> = ({ brand, className }) => {
  const colors = brand.supplementaryChartColors || [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ];

  const usageData = brand.chartShowcase?.usageData || [
    {
      month: "Jan",
      desktop: 245,
      mobile: 180,
      tablet: 95,
    },
    {
      month: "Feb",
      desktop: 280,
      mobile: 220,
      tablet: 110,
    },
    {
      month: "Mar",
      desktop: 320,
      mobile: 250,
      tablet: 125,
    },
    {
      month: "Apr",
      desktop: 380,
      mobile: 290,
      tablet: 140,
    },
    {
      month: "May",
      desktop: 420,
      mobile: 340,
      tablet: 160,
    },
    {
      month: "Jun",
      desktop: 450,
      mobile: 380,
      tablet: 175,
    },
  ];

  const performanceData = brand.chartShowcase?.performanceData || [
    { name: "Metric 1", value: 80, trend: "+5%" },
    { name: "Metric 2", value: 75, trend: "+3%" },
    { name: "Metric 3", value: 90, trend: "+8%" },
    { name: "Metric 4", value: 85, trend: "+2%" },
  ];

  const distributionData = brand.chartShowcase?.distributionData || [
    { name: "Category 1", value: 400, fill: colors[0], count: "400" },
    { name: "Category 2", value: 300, fill: colors[1], count: "300" },
    { name: "Category 3", value: 200, fill: colors[2], count: "200" },
  ];

  const quickStats = brand.chartShowcase?.quickStats || [
    { label: "Stat 1", value: "1.2M" },
    { label: "Stat 2", value: "85%" },
    { label: "Stat 3", value: "4.9" },
    { label: "Stat 4", value: "32K" },
  ];

  const applySpecial = shouldApplySpecialLayout(brand);

  // Extract chart styling preferences from brand definition
  const chartStyles = brand.componentStyles?.charts || {};

  // Reverted from motion.div to div
  return (
    <div className="space-y-8">
      <div
        className="p-6 rounded-lg"
        style={{
          background: "var(--chart-showcase-card-background)",
          backgroundImage: "var(--chart-showcase-card-background-image)",
          borderColor: "var(--chart-showcase-card-border-color)",
          borderWidth: "var(--chart-showcase-card-border-width)",
          borderStyle: "var(--chart-showcase-card-border-style)",
          boxShadow: "var(--chart-showcase-card-box-shadow)",
          borderRadius: "var(--chart-showcase-card-border-radius, var(--radius-lg))",
        }}
      >
        <h2
          className="text-xl font-semibold mb-4"
          style={{
            fontWeight: brand.componentStyles?.chartShowcaseTitle?.fontWeight || "600",
            fontSize: brand.componentStyles?.chartShowcaseTitle?.fontSize || "1.25rem",
            letterSpacing: brand.componentStyles?.chartShowcaseTitle?.letterSpacing || "normal",
            textTransform: brand.componentStyles?.chartShowcaseTitle?.textTransform || "none",
          }}
        >
          {brand.chartShowcase?.title || "Data Visualization"}
        </h2>
        <p className="text-muted-foreground mb-6">
          {brand.chartShowcase?.description || "Explore interactive data visualizations"}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Usage Trends */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium">Usage Trends</CardTitle>
                <CardDescription>Monthly device usage patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={usageData}
                      margin={{
                        top: 5,
                        right: 5,
                        left: 5,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke={chartStyles.gridStrokeColor || "rgba(200, 200, 200, 0.3)"}
                        vertical={false}
                      />
                      <XAxis 
                        dataKey="month" 
                        stroke={chartStyles.axisStrokeColor || "#717171"} 
                        tick={{ fill: chartStyles.axisTextColor || "#717171", fontSize: 12 }}
                      />
                      <YAxis 
                        stroke={chartStyles.axisStrokeColor || "#717171"} 
                        tick={{ fill: chartStyles.axisTextColor || "#717171", fontSize: 12 }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "var(--card)", 
                          borderColor: "var(--border)",
                          borderRadius: "var(--radius)",
                          boxShadow: "var(--shadow-md)"
                        }}
                        cursor={{ fill: chartStyles.tooltipCursorFill || "rgba(0, 0, 0, 0.1)" }}
                        labelStyle={{ color: "var(--foreground)" }}
                      />
                      <Legend 
                        wrapperStyle={{ 
                          fontSize: "12px", 
                          color: chartStyles.legendTextColor || "#484848" 
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="desktop"
                        stackId="1"
                        stroke={colors[0]}
                        fill={colors[0]}
                        fillOpacity={0.8}
                      />
                      <Area
                        type="monotone"
                        dataKey="mobile"
                        stackId="1"
                        stroke={colors[1]}
                        fill={colors[1]}
                        fillOpacity={0.8}
                      />
                      <Area
                        type="monotone"
                        dataKey="tablet"
                        stackId="1"
                        stroke={colors[2]}
                        fill={colors[2]}
                        fillOpacity={0.8}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Distribution */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium">Platform Distribution</CardTitle>
                <CardDescription>User segmentation by device</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={distributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        innerRadius={30}
                        paddingAngle={4}
                        dataKey="value"
                        label={({
                          cx,
                          cy,
                          midAngle,
                          innerRadius,
                          outerRadius,
                          percent,
                          count,
                          name,
                        }) => {
                          const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
                          const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                          const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                          return (
                            <text
                              x={x}
                              y={y}
                              fill={chartStyles.legendTextColor || "#484848"}
                              textAnchor={x > cx ? "start" : "end"}
                              dominantBaseline="central"
                              fontSize={12}
                            >
                              {`${name} (${(percent * 100).toFixed(0)}%)`}
                            </text>
                          );
                        }}
                      >
                        {distributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} stroke="var(--background)" />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ 
                          backgroundColor: "var(--card)", 
                          borderColor: "var(--border)",
                          borderRadius: "var(--radius)",
                          boxShadow: "var(--shadow-md)"
                        }}
                        formatter={(value, name, props) => {
                          const entry = distributionData.find((d) => d.name === name);
                          return [`${entry?.count || value}`, name];
                        }}
                        labelStyle={{ color: "var(--foreground)" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Performance Metrics */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">Performance Metrics</CardTitle>
              <CardDescription>Key indicators and growth trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={performanceData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke={chartStyles.gridStrokeColor || "rgba(200, 200, 200, 0.3)"}
                      horizontal={true}
                      vertical={false}
                    />
                    <XAxis 
                      type="number" 
                      domain={[0, 100]} 
                      stroke={chartStyles.axisStrokeColor || "#717171"} 
                      tick={{ fill: chartStyles.axisTextColor || "#717171", fontSize: 12 }}
                    />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      stroke={chartStyles.axisStrokeColor || "#717171"} 
                      tick={{ fill: chartStyles.axisTextColor || "#717171", fontSize: 12 }}
                      width={100}
                    />
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: "var(--card)", 
                        borderColor: "var(--border)",
                        borderRadius: "var(--radius)",
                        boxShadow: "var(--shadow-md)"
                      }}
                      formatter={(value, name, props) => {
                        const entry = performanceData.find((d) => d.value === value);
                        return [`${value}% (${entry?.trend || ""})`, name];
                      }}
                      cursor={{ fill: chartStyles.tooltipCursorFill || "rgba(0, 0, 0, 0.1)" }}
                    />
                    <Bar dataKey="value" fill={colors[0]} radius={[0, 4, 4, 0]}>
                      {performanceData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.trend.includes("+") ? colors[0] : colors[3]} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">Quick Stats</CardTitle>
              <CardDescription>At-a-glance performance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {quickStats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="p-4 rounded-lg"
                    style={{
                      background: "var(--muted)",
                      borderLeft: `4px solid ${colors[index % colors.length]}`,
                    }}
                  >
                    <p className="text-muted-foreground text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}; 