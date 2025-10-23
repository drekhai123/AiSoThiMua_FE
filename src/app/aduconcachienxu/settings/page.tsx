"use client";

import { useState } from "react";
import { Save, Bell, Lock, Globe, Mail, Shield } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "ASTM Store",
    siteEmail: "admin@astm.com",
    sitePhone: "0123456789",
    notificationsEnabled: true,
    emailNotifications: true,
    maintenanceMode: false,
    twoFactorAuth: true,
  });

  const handleSave = () => {
    // TODO: Save settings to API
    alert("Đã lưu cài đặt!");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Cài đặt</h1>
        <p className="text-neutral-400">Quản lý cài đặt hệ thống</p>
      </div>

      {/* General Settings */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-semibold text-white">Cài đặt chung</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Tên website
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) =>
                setSettings({ ...settings, siteName: e.target.value })
              }
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Email liên hệ
            </label>
            <input
              type="email"
              value={settings.siteEmail}
              onChange={(e) =>
                setSettings({ ...settings, siteEmail: e.target.value })
              }
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Số điện thoại
            </label>
            <input
              type="text"
              value={settings.sitePhone}
              onChange={(e) =>
                setSettings({ ...settings, sitePhone: e.target.value })
              }
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-semibold text-white">Thông báo</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-white">Bật thông báo</p>
              <p className="text-sm text-neutral-400">
                Nhận thông báo về hoạt động hệ thống
              </p>
            </div>
            <button
              onClick={() =>
                setSettings({
                  ...settings,
                  notificationsEnabled: !settings.notificationsEnabled,
                })
              }
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.notificationsEnabled ? "bg-blue-600" : "bg-neutral-700"
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.notificationsEnabled
                    ? "translate-x-7"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-white">Thông báo qua email</p>
              <p className="text-sm text-neutral-400">
                Gửi thông báo quan trọng qua email
              </p>
            </div>
            <button
              onClick={() =>
                setSettings({
                  ...settings,
                  emailNotifications: !settings.emailNotifications,
                })
              }
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.emailNotifications ? "bg-blue-600" : "bg-neutral-700"
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.emailNotifications
                    ? "translate-x-7"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-semibold text-white">Bảo mật</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-white">Xác thực 2 yếu tố</p>
              <p className="text-sm text-neutral-400">
                Bảo vệ tài khoản với xác thực 2 lớp
              </p>
            </div>
            <button
              onClick={() =>
                setSettings({
                  ...settings,
                  twoFactorAuth: !settings.twoFactorAuth,
                })
              }
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.twoFactorAuth ? "bg-blue-600" : "bg-neutral-700"
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.twoFactorAuth ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-white">Chế độ bảo trì</p>
              <p className="text-sm text-neutral-400">
                Tạm dừng truy cập website cho người dùng
              </p>
            </div>
            <button
              onClick={() =>
                setSettings({
                  ...settings,
                  maintenanceMode: !settings.maintenanceMode,
                })
              }
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.maintenanceMode ? "bg-red-600" : "bg-neutral-700"
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.maintenanceMode ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          <Save className="w-5 h-5" />
          <span>Lưu thay đổi</span>
        </button>
      </div>
    </div>
  );
}
