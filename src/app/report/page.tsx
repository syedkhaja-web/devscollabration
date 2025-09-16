
'use client';

import { useState, useEffect } from 'react';
import { SiteHeader } from '@/components/site-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart as AreaChartIcon, BarChart, FileText, GitCommit, Users, Activity, Sparkles, Loader2 } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart"
import dynamic from 'next/dynamic';
import {Pie as PieRecharts, Cell, PieChart as PieChartRecharts, ResponsiveContainer, Tooltip} from 'recharts'
import { generateQuote } from '@/ai/flows/generate-quote-flow';
import { Skeleton } from '@/components/ui/skeleton';

const AreaChart = dynamic(() => import('recharts').then(mod => mod.AreaChart), {
  ssr: false,
  loading: () => <Skeleton className="h-[300px] w-full" />,
});

const Area = dynamic(() => import('recharts').then(mod => mod.Area), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const pieChartData = [
    { name: 'Feature A', value: 400, fill: 'hsl(var(--chart-1))' },
    { name: 'Feature B', value: 300, fill: 'hsl(var(--chart-2))' },
    { name: 'Bugfixes', value: 200, fill: 'hsl(var(--chart-3))' },
    { name: 'Documentation', value: 100, fill: 'hsl(var(--chart-4))' },
];

const MotivationalQuote = () => {
    const [quote, setQuote] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchQuote = async () => {
            setIsLoading(true);
            try {
                const result = await generateQuote();
                setQuote(result.quote);
            } catch (error) {
                console.error("Failed to generate quote:", error);
                setQuote("Couldn't generate a quote, but keep up the great work!");
            } finally {
                setIsLoading(false);
            }
        };
        fetchQuote();
    }, []);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Your Daily Dose of Motivation</CardTitle>
                <Sparkles className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {isLoading ? (
                     <div className="pt-2">
                        <Skeleton className="h-5 w-3/4" />
                     </div>
                ) : (
                    <blockquote className="text-lg font-semibold italic pt-2">
                        "{quote}"
                    </blockquote>
                )}
            </CardContent>
        </Card>
    );
};


export default function ReportPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="border-b bg-secondary py-12 md:py-20">
             <div className="container text-center">
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                Project Abstract: Edge to Edge
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                A comprehensive overview of project progress, team contributions, and overall momentum from start to finish.
                </p>
            </div>
        </div>
        
        <div className="container py-12 md:py-16">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Commits</CardTitle>
                    <GitCommit className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12,408</div>
                    <p className="text-xs text-muted-foreground">+15% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Contributors</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">83</div>
                    <p className="text-xs text-muted-foreground">+5 since last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Open Tasks</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">42</div>
                    <p className="text-xs text-muted-foreground">-10 from last month</p>
                  </CardContent>
                </Card>
                 <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Project Health</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">98%</div>
                    <p className="text-xs text-muted-foreground">CI/CD passing rate</p>
                  </CardContent>
                </Card>
            </div>
            
            <div className="mt-8">
              <MotivationalQuote />
            </div>

            <div className="grid gap-8 mt-8 md:grid-cols-2 lg:grid-cols-2">
                <Card className="col-span-1 lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Commit Activity Over Time</CardTitle>
                        <CardDescription>A look at the development pace over the last six months.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] w-full p-2">
                        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                            <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12, top: 10}}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dot" />}
                                />
                                <Area
                                dataKey="desktop"
                                type="natural"
                                fill="var(--color-desktop)"
                                fillOpacity={0.4}
                                stroke="var(--color-desktop)"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Work Distribution</CardTitle>
                        <CardDescription>Breakdown of commit types across the project.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] w-full p-2">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChartRecharts>
                                <Tooltip
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                        return (
                                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="flex flex-col">
                                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                    {payload[0].name}
                                                </span>
                                                <span className="font-bold text-muted-foreground">
                                                    {payload[0].value}
                                                </span>
                                                </div>
                                            </div>
                                            </div>
                                        )
                                        }

                                        return null
                                    }}
                                />
                                <PieRecharts 
                                    data={pieChartData} 
                                    dataKey="value" 
                                    nameKey="name" 
                                    cx="50%" 
                                    cy="50%" 
                                    outerRadius={100} 
                                    strokeWidth={5}
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </PieRecharts>
                            </PieChartRecharts>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
    </div>
  );
}
