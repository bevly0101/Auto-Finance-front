import React, { useState } from "react";
import SidebarV2 from "../components/SidebarV2/SidebarV2";
import HeaderPixelPerfect from "../components/HeaderPixelPerfect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import GeneralSettingsSection from "../components/settings/GeneralSettingsSection";
import NotificationSettingsSection from "../components/settings/NotificationSettingsSection";
import PrivacySettingsSection from "../components/settings/PrivacySettingsSection";
import CategorySettingsSection from "../components/settings/CategorySettingsSection";
import { useResponsive } from "@/hooks/useResponsive";

export default function SettingsPage(): JSX.Element {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { isMobile } = useResponsive();
  const [activeTab, setActiveTab] = useState("general");

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const tabs = [
    { value: "general", label: "Geral" },
    { value: "notifications", label: "Notificações" },
    { value: "privacy", label: "Privacidade e Segurança" },
    { value: "categories", label: "Categorias" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarV2 isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 overflow-x-hidden">
        <HeaderPixelPerfect title="Configurações" toggleSidebar={toggleSidebar} />
        <main className="p-4 lg:p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {isMobile ? (
              <Carousel setApi={() => {}} className="w-full">
                <CarouselContent>
                  {tabs.map((tab) => (
                    <CarouselItem key={tab.value} className="basis-auto pr-2">
                      <div className="p-1">
                        <Button
                          variant={activeTab === tab.value ? "default" : "outline"}
                          className="w-full whitespace-nowrap px-4"
                          onClick={() => setActiveTab(tab.value)}
                        >
                          {tab.label}
                        </Button>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            ) : (
              <TabsList className="grid w-full grid-cols-4 max-w-3xl mx-auto">
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
                ))}
              </TabsList>
            )}

            <TabsContent value="general" className="mt-6">
              <GeneralSettingsSection />
            </TabsContent>
            <TabsContent value="notifications" className="mt-6">
              <NotificationSettingsSection />
            </TabsContent>
            <TabsContent value="privacy" className="mt-6">
              <PrivacySettingsSection />
            </TabsContent>
            <TabsContent value="categories" className="mt-6">
              <CategorySettingsSection />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}