
'use client';

import { SiteHeader } from '@/components/site-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, BarChart, FileText, GitCommit, Users, Activity } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Area, CartesianGrid, XAxis, YAxis, Pie, PieChart } from "recharts"
import dynamic from 'next/dynamic';

const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), {
  ssr: false,
});


const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const pieChartData = [
    { name: 'Feature A', value: 400, fill: 'hsl(var(--chart-1))' },
    { name: 'Feature B', value: 300, fill: 'hsl(var(--chart-2))' },
    { name: 'Bugfixes', value: 200, fill: 'hsl(var(--chart-3))' },
    { name: 'Documentation', value: 100, fill: 'hsl(var(--chart-4))' },
];


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

            <div className="grid gap-8 mt-8 md:grid-cols-2 lg:grid-cols-2">
                <Card className="col-span-1 lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Commit Activity Over Time</CardTitle>
                        <CardDescription>A look at the development pace over the last six months.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] w-full p-2">
                        <ResponsiveContainer width="100%" height="100%">
                             <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12}/>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <ChartTooltip 
                                    cursor={{fill: 'hsl(var(--accent))'}}
                                    content={<ChartTooltipContent />} 
                                />
                                <Area type="monotone" dataKey="desktop" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorUv)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Work Distribution</CardTitle>
                        <CardDescription>Breakdown of commit types across the project.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] w-full p-2">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                <Pie 
                                    data={pieChartData} 
                                    dataKey="value" 
                                    nameKey="name" 
                                    cx="50%" 
                                    cy="50%" 
                                    outerRadius={100} 
                                    strokeWidth={5}
                                >
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
    </div>
  );
}
