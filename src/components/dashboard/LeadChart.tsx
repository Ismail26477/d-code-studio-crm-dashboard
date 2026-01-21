import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", leads: 120 },
  { name: "Tue", leads: 190 },
  { name: "Wed", leads: 150 },
  { name: "Thu", leads: 280 },
  { name: "Fri", leads: 220 },
  { name: "Sat", leads: 180 },
  { name: "Sun", leads: 140 },
];

export function LeadChart() {
  return (
    <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Daily Lead Flow</h3>
        <p className="text-sm text-muted-foreground">Leads across all client CRMs this week</p>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="leadGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: 'var(--shadow-md)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Area 
              type="monotone" 
              dataKey="leads" 
              stroke="#8B5CF6" 
              strokeWidth={2}
              fill="url(#leadGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
