import Image from "next/image";
import { Sparkles, Mail, Zap, Shield, Palette } from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";

export default function Home() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      {/* Capstone Project Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-bunting font-newsreader mb-2">
          Danyang Wang & Joshua Lee Capstone Project Demo
        </h1>
      </div>
      
      {/* Mobile App Container with glassmorphism */}
      <div className="mx-auto max-w-md glass shadow-elevated overflow-hidden">
        {/* Header with animated gradient */}
        <div className="bg-gradient-to-br from-primary via-blue-chill to-bunting px-6 py-10 text-white relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6 animate-[float_3s_ease-in-out_infinite]">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl"></div>
                <Image
                  src="/logo.png"
                  alt="Factr Logo"
                  width={100}
                  height={100}
                  className="rounded-2xl relative z-10 shadow-2xl"
                />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-center mb-2">Design System</h1>
            <p className="text-sm text-center text-white/80 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Modern Mobile App Demo
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-8 space-y-8 bg-gradient-to-b from-white/50 to-white/80 backdrop-blur-sm">
          {/* Typography Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold text-bunting">Typography</h2>
            </div>
            <Card variant="glass" className="space-y-3">
              <div className="text-4xl font-bold text-bunting leading-tight">
                Display - Newsreader
              </div>
              <div className="text-3xl font-bold text-bunting">Heading 1</div>
              <div className="text-2xl font-bold text-bunting">Heading 2</div>
              <div className="text-xl font-bold text-bunting">Heading 3</div>
              <div className="text-base font-medium text-bunting">Subheading - Roboto</div>
              <div className="text-sm text-gray-700">Body Text - Roboto Regular</div>
              <div className="text-xs text-gray-500">Caption - Roboto</div>
            </Card>
          </section>

          {/* Colors Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              <h2 className="text-2xl font-bold text-bunting">Color Palette</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 group cursor-pointer">
                <div className="bg-primary h-28 rounded-2xl shadow-glow-primary transition-all duration-300 group-hover:scale-105"></div>
                <p className="text-xs font-semibold text-gray-700 text-center">Robin's Egg</p>
                <p className="text-xs text-gray-500 text-center font-mono">#06C0D7</p>
              </div>
              <div className="space-y-2 group cursor-pointer">
                <div className="bg-accent h-28 rounded-2xl shadow-glow-accent transition-all duration-300 group-hover:scale-105"></div>
                <p className="text-xs font-semibold text-gray-700 text-center">Ecstasy</p>
                <p className="text-xs text-gray-500 text-center font-mono">#F77024</p>
              </div>
              <div className="space-y-2 group cursor-pointer">
                <div className="bg-blue-chill h-28 rounded-2xl shadow-soft transition-all duration-300 group-hover:scale-105"></div>
                <p className="text-xs font-semibold text-gray-700 text-center">Blue Chill</p>
                <p className="text-xs text-gray-500 text-center font-mono">#117297</p>
              </div>
              <div className="space-y-2 group cursor-pointer">
                <div className="bg-bunting h-28 rounded-2xl shadow-soft transition-all duration-300 group-hover:scale-105"></div>
                <p className="text-xs font-semibold text-gray-700 text-center">Bunting</p>
                <p className="text-xs text-gray-500 text-center font-mono">#1B2356</p>
              </div>
            </div>
          </section>

          {/* Components Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-bunting" />
              <h2 className="text-2xl font-bold text-bunting">Components</h2>
            </div>
            <div className="space-y-4">
              <Button variant="primary">Primary Button</Button>
              <Button variant="accent">Accent Button</Button>
              <Button variant="dark">Dark Button</Button>
              <Button variant="outline">Outlined Button</Button>

              {/* Featured Card with blue-chill background */}
              <Card variant="gradient" className="relative overflow-hidden !bg-blue-chill !bg-none">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <h3 className="text-xl font-bold mb-2 relative z-10">Featured Card</h3>
                <p className="text-sm text-white/90 relative z-10">
                  Beautiful gradient card with glassmorphism effects, inspired by modern design systems like Clerk.
                </p>
              </Card>

              {/* Glass Card */}
              <Card variant="glass">
                <h3 className="text-lg font-bold text-bunting mb-2">Glass Card</h3>
                <p className="text-sm text-gray-600">
                  Frosted glass effect with backdrop blur for a premium feel.
                </p>
              </Card>

              {/* Standard Card */}
              <Card variant="default">
                <h3 className="text-lg font-bold text-bunting mb-2">Standard Card</h3>
                <p className="text-sm text-gray-600">
                  Clean card with subtle shadows and hover lift effect.
                </p>
              </Card>

              {/* Input with Icon */}
              <Input 
                label="Email Address" 
                type="email" 
                placeholder="you@example.com"
                icon={<Mail className="w-5 h-5" />}
              />
              
              <Input 
                label="Full Name" 
                type="text" 
                placeholder="John Doe"
              />
            </div>
          </section>

          {/* Footer with badge */}
          <div className="text-center pt-6 border-t border-gray-200">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-medium mb-3">
              <Sparkles className="w-3 h-3" />
              Design System v2.0
            </div>
            <p className="text-xs text-gray-500">
              Built with Next.js, Tailwind CSS, Newsreader & Roboto
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Featuring glassmorphism, animations, and Clerk-inspired design
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
