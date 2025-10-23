"use client";

import { useState } from "react";
import { Search, Send, Paperclip, MoreVertical, Circle, User, ShoppingBag, X } from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isFromCustomer: boolean;
}

interface Conversation {
  id: string;
  customerName: string;
  customerAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  messages: Message[];
}

export default function ContactsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "CONV-001",
      customerName: "Nguyễn Văn A",
      lastMessage: "Tôi muốn hỏi về gói ChatGPT Plus",
      lastMessageTime: "15:30",
      unreadCount: 2,
      isOnline: true,
      messages: [
        {
          id: "M1",
          senderId: "customer",
          text: "Xin chào, tôi muốn hỏi về gói ChatGPT Plus có hỗ trợ tiếng Việt không ạ?",
          timestamp: "15:25",
          isFromCustomer: true,
        },
        {
          id: "M2",
          senderId: "admin",
          text: "Chào bạn! ChatGPT Plus hỗ trợ rất tốt tiếng Việt ạ. Bạn có thể sử dụng bình thường.",
          timestamp: "15:27",
          isFromCustomer: false,
        },
        {
          id: "M3",
          senderId: "customer",
          text: "Vậy có thể gia hạn được không ạ?",
          timestamp: "15:30",
          isFromCustomer: true,
        },
      ],
    },
    {
      id: "CONV-002",
      customerName: "Trần Thị B",
      lastMessage: "Cảm ơn shop nhé!",
      lastMessageTime: "14:15",
      unreadCount: 0,
      isOnline: false,
      messages: [
        {
          id: "M4",
          senderId: "customer",
          text: "Shop có hỗ trợ thanh toán qua ví MoMo không ạ?",
          timestamp: "14:10",
          isFromCustomer: true,
        },
        {
          id: "M5",
          senderId: "admin",
          text: "Dạ ạ, shop có hỗ trợ MoMo, ZaloPay và chuyển khoản ngân hàng ạ.",
          timestamp: "14:12",
          isFromCustomer: false,
        },
        {
          id: "M6",
          senderId: "customer",
          text: "Cảm ơn shop nhé!",
          timestamp: "14:15",
          isFromCustomer: true,
        },
      ],
    },
    {
      id: "CONV-003",
      customerName: "Lê Văn C",
      lastMessage: "Tài khoản của tôi bị khóa",
      lastMessageTime: "16:45",
      unreadCount: 1,
      isOnline: true,
      messages: [
        {
          id: "M7",
          senderId: "customer",
          text: "Tài khoản của tôi bị khóa, tôi muốn được hỗ trợ mở lại. User ID: U003",
          timestamp: "16:45",
          isFromCustomer: true,
        },
      ],
    },
    {
      id: "CONV-004",
      customerName: "Phạm Thị D",
      lastMessage: "Tôi hiểu rồi, cảm ơn!",
      lastMessageTime: "10:20",
      unreadCount: 0,
      isOnline: false,
      messages: [
        {
          id: "M8",
          senderId: "customer",
          text: "Đơn hàng của tôi bị lỗi, tôi muốn được hoàn tiền. Mã đơn: ORD-004",
          timestamp: "10:15",
          isFromCustomer: true,
        },
        {
          id: "M9",
          senderId: "admin",
          text: "Chúng tôi sẽ kiểm tra và hoàn tiền trong vòng 24h ạ.",
          timestamp: "10:18",
          isFromCustomer: false,
        },
        {
          id: "M10",
          senderId: "customer",
          text: "Tôi hiểu rồi, cảm ơn!",
          timestamp: "10:20",
          isFromCustomer: true,
        },
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);

  const filteredConversations = conversations.filter((conv) =>
    conv.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: `M${Date.now()}`,
      senderId: "admin",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      isFromCustomer: false,
    };

    setConversations(
      conversations.map((conv) =>
        conv.id === selectedConversation.id
          ? {
              ...conv,
              messages: [...conv.messages, message],
              lastMessage: newMessage,
              lastMessageTime: message.timestamp,
            }
          : conv
      )
    );

    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, message],
    });

    setNewMessage("");
  };

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex h-full">
        {/* Sidebar - Danh sách hội thoại */}
        <div className="w-72 border-r border-neutral-800 flex flex-col flex-shrink-0">
          {/* Header */}
          <div className="p-4 border-b border-neutral-800">
            <h2 className="text-xl font-bold text-white mb-3">Tin nhắn</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm placeholder-neutral-400 focus:outline-none focus:border-blue-600"
              />
            </div>
            {totalUnread > 0 && (
              <p className="text-xs text-neutral-400 mt-2">
                {totalUnread} tin nhắn chưa đọc
              </p>
            )}
          </div>

          {/* Danh sách hội thoại */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`w-full p-4 flex items-start gap-3 hover:bg-neutral-800 transition-colors border-b border-neutral-800 ${
                  selectedConversation?.id === conv.id ? "bg-neutral-800" : ""
                }`}
              >
                {/* Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {conv.customerName.charAt(0)}
                  </div>
                  {conv.isOnline && (
                    <Circle className="absolute bottom-0 right-0 w-3 h-3 fill-green-500 text-green-500" />
                  )}
                </div>

                {/* Thông tin */}
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-white text-sm truncate">
                      {conv.customerName}
                    </h3>
                    <span className="text-xs text-neutral-400 flex-shrink-0 ml-2">
                      {conv.lastMessageTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm text-neutral-400 truncate">
                      {conv.lastMessage}
                    </p>
                    {conv.unreadCount > 0 && (
                      <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full flex-shrink-0">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Khu vực chat */}
        {selectedConversation ? (
          <div className="flex-1 flex flex-col">
            {/* Header chat */}
            <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {selectedConversation.customerName.charAt(0)}
                  </div>
                  {selectedConversation.isOnline && (
                    <Circle className="absolute bottom-0 right-0 w-3 h-3 fill-green-500 text-green-500" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    {selectedConversation.customerName}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    {selectedConversation.isOnline ? "Đang hoạt động" : "Không hoạt động"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 relative">
                <button 
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-neutral-400" />
                </button>
                
                {/* Dropdown Menu */}
                {showMenu && (
                  <div className="absolute top-12 right-0 w-56 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg z-50">
                    <button
                      onClick={() => {
                        setShowUserInfo(true);
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-neutral-700 transition-colors text-left border-b border-neutral-700"
                    >
                      <User className="w-5 h-5 text-blue-500" />
                      <span className="text-white text-sm">Thông tin cá nhân</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowOrderHistory(true);
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-neutral-700 transition-colors text-left"
                    >
                      <ShoppingBag className="w-5 h-5 text-green-500" />
                      <span className="text-white text-sm">Lịch sử đơn hàng</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Khu vực tin nhắn */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {selectedConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isFromCustomer ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[70%] ${
                      message.isFromCustomer
                        ? "bg-neutral-800 text-white"
                        : "bg-blue-600 text-white"
                    } rounded-2xl px-4 py-2`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input gửi tin nhắn */}
            <div className="p-4 border-t border-neutral-800">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
                  <Paperclip className="w-5 h-5 text-neutral-400" />
                </button>
                <input
                  type="text"
                  placeholder="Nhập tin nhắn..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-blue-600"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-700 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-neutral-400">
            Chọn một cuộc hội thoại để bắt đầu
          </div>
        )}
      </div>

      {/* Modal Thông tin cá nhân */}
      {showUserInfo && selectedConversation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowUserInfo(false)}>
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Thông tin cá nhân</h3>
              <button onClick={() => setShowUserInfo(false)} className="p-1 hover:bg-neutral-800 rounded">
                <X className="w-5 h-5 text-neutral-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-semibold">
                  {selectedConversation.customerName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">{selectedConversation.customerName}</h4>
                  <p className="text-sm text-neutral-400">{selectedConversation.isOnline ? "Đang hoạt động" : "Không hoạt động"}</p>
                </div>
              </div>
              <div className="border-t border-neutral-800 pt-4 space-y-3">
                <div>
                  <p className="text-sm text-neutral-400 mb-1">Email</p>
                  <p className="text-white">customer@example.com</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-400 mb-1">Số điện thoại</p>
                  <p className="text-white">0901234567</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-400 mb-1">User ID</p>
                  <p className="text-white">U001</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-400 mb-1">Ngày tham gia</p>
                  <p className="text-white">15/01/2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Lịch sử đơn hàng */}
      {showOrderHistory && selectedConversation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowOrderHistory(false)}>
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Lịch sử đơn hàng</h3>
              <button onClick={() => setShowOrderHistory(false)} className="p-1 hover:bg-neutral-800 rounded">
                <X className="w-5 h-5 text-neutral-400" />
              </button>
            </div>
            <div className="space-y-3">
              {/* Đơn hàng mẫu */}
              <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-white">ORD-001</p>
                    <p className="text-sm text-neutral-400">22/10/2025</p>
                  </div>
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-medium rounded-full">
                    Hoàn thành
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-neutral-300">ChatGPT Plus, GitHub Copilot</p>
                  <p className="text-sm font-semibold text-white">498 Cá</p>
                </div>
              </div>
              <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-white">ORD-002</p>
                    <p className="text-sm text-neutral-400">20/10/2025</p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 text-xs font-medium rounded-full">
                    Đang xử lý
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-neutral-300">Claude Pro</p>
                  <p className="text-sm font-semibold text-white">399 Cá</p>
                </div>
              </div>
              <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-white">ORD-003</p>
                    <p className="text-sm text-neutral-400">18/10/2025</p>
                  </div>
                  <span className="px-3 py-1 bg-red-500/10 text-red-500 text-xs font-medium rounded-full">
                    Đã hủy
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-neutral-300">Midjourney Standard</p>
                  <p className="text-sm font-semibold text-white">599 Cá</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
