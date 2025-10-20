"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Bell,
  Mail,
  Smartphone,
  Shield,
  Volume2,
  VolumeX,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Settings,
  Save,
  ArrowLeft,
  Laptop2,
} from "lucide-react";
import Link from "next/link";

interface NotificationSettings {
  // Email notifications
  email: {
    enabled: boolean;
    newOrders: boolean;
    promotions: boolean;
    security: boolean;
    updates: boolean;
  };
  // Push notifications
  push: {
    enabled: boolean;
    newOrders: boolean;
    promotions: boolean;
    security: boolean;
    updates: boolean;
  };
  // SMS notifications
  sms: {
    enabled: boolean;
    newOrders: boolean;
    security: boolean;
  };
  // General settings
  general: {
    quietHours: boolean;
    quietStart: string;
    quietEnd: string;
    soundEnabled: boolean;
    vibrationEnabled: boolean;
  };
}

export default function NotificationsPage() {
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const [settings, setSettings] = useState<NotificationSettings>({
    email: {
      enabled: true,
      newOrders: true,
      promotions: true,
      security: true,
      updates: false,
    },
    push: {
      enabled: true,
      newOrders: true,
      promotions: false,
      security: true,
      updates: true,
    },
    sms: {
      enabled: false,
      newOrders: false,
      security: true,
    },
    general: {
      quietHours: false,
      quietStart: "22:00",
      quietEnd: "08:00",
      soundEnabled: true,
      vibrationEnabled: true,
    },
  });

  const handleSettingChange = (category: keyof NotificationSettings, key: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    // TODO: Implement save to backend
    console.log("Saving notification settings:", settings);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsLoading(false);
    setHasChanges(false);
    // TODO: Show success toast
  };

  const handleReset = () => {
    setSettings({
      email: {
        enabled: true,
        newOrders: true,
        promotions: true,
        security: true,
        updates: false,
      },
      push: {
        enabled: true,
        newOrders: true,
        promotions: false,
        security: true,
        updates: true,
      },
      sms: {
        enabled: false,
        newOrders: false,
        security: true,
      },
      general: {
        quietHours: false,
        quietStart: "22:00",
        quietEnd: "08:00",
        soundEnabled: true,
        vibrationEnabled: true,
      },
    });
    setHasChanges(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Vui lòng đăng nhập
          </h2>
          <Link
            href="/login"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/profile"
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Bell className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Cài đặt thông báo
                </h1>
                <p className="text-gray-400">
                  Quản lý cách bạn nhận thông báo từ AiSoThiMua
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Push Notifications */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Push Notifications</h2>
                <p className="text-gray-400 text-sm">Thông báo trên thiết bị</p>
              </div>
              <div className="ml-auto">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.push.enabled}
                    onChange={(e) => handleSettingChange('push', 'enabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>

            {settings.push.enabled && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <NotificationItem
                    disabled={true}
                    disabledReason="Tính năng đang phát triển"
                    icon={<CheckCircle className="w-4 h-4" />}
                    title="Đơn hàng hoàn thành"
                    description="Thông báo khi đơn hàng của bạn được hoàn thành"
                    checked={settings.push.newOrders}
                    onChange={(checked) => handleSettingChange('push', 'newOrders', checked)}
                  />
                  <NotificationItem
                    disabled={true}
                    disabledReason="Tính năng đang phát triển"
                    icon={<Info className="w-4 h-4" />}
                    title="Khuyến mãi"
                    description="Ưu đãi và chương trình khuyến mãi"
                    checked={settings.push.promotions}
                    onChange={(checked) => handleSettingChange('push', 'promotions', checked)}
                  />
                  <NotificationItem
                    disabled={true}
                    disabledReason="Tính năng đang phát triển"
                    icon={<Shield className="w-4 h-4" />}
                    title="Bảo mật"
                    description="Thông báo bảo mật quan trọng"
                    checked={settings.push.security}
                    onChange={(checked) => handleSettingChange('push', 'security', checked)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all font-semibold"
            >
              Đặt lại
            </button>
            <button
              onClick={handleSave}
              disabled={!hasChanges || isLoading}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Lưu cài đặt
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

// Notification Item Component
interface NotificationItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  disabledReason?: string;
}

function NotificationItem({ icon, title, description, checked, onChange, disabled = false, disabledReason }: NotificationItemProps) {
  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg transition-colors ${disabled ? 'bg-slate-700/30 opacity-50' : 'bg-slate-700/50 hover:bg-slate-700'}`}>
      <div className={`p-2 rounded-lg ${checked ? 'bg-green-500/10' : 'bg-gray-500/10'}`}>
        <div className={`${checked ? 'text-green-400' : 'text-gray-400'}`}>
          {icon}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-white font-medium mb-1">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
        {disabled && disabledReason && (
          <p className="text-yellow-400 text-xs mt-1">{disabledReason}</p>
        )}
      </div>
      <label className={`relative inline-flex items-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only peer"
        />
        <div className={`w-9 h-5 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all ${disabled ? 'bg-slate-700 peer-checked:bg-slate-600' : 'bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 peer-checked:bg-purple-600'}`}></div>
      </label>
    </div>
  );
}
