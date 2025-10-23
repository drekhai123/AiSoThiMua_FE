"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Youtube from "@tiptap/extension-youtube";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { useCallback, useState, useEffect } from "react";

// Icons
import { 
  BsTypeBold, 
  BsTypeItalic, 
  BsTypeUnderline, 
  BsTypeStrikethrough,
  BsListUl,
  BsListOl,
  BsListCheck,
  BsLink45Deg,
  BsImage,
  BsTable,
  BsTextLeft,
  BsTextCenter,
  BsTextRight,
  BsYoutube
} from "react-icons/bs";
import { FaQuoteRight, FaTiktok } from "react-icons/fa6";
import { 
  MdCode, 
  MdHorizontalRule,
  MdFormatColorText,
  MdFormatClear,
  MdSubscript,
  MdSuperscript
} from "react-icons/md";
import { AiOutlineNumber } from "react-icons/ai";
import { LuUndo2, LuRedo2, LuHighlighter } from "react-icons/lu";

interface FullEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  editable?: boolean;
  minHeight?: string;
  theme?: "light" | "dark";
}

export default function FullEditor({
  content,
  onChange,
  placeholder = "Start writing...",
  editable = true,
  minHeight = "500px",
  theme = "dark",
}: FullEditorProps) {
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMode, setUploadMode] = useState<'url' | 'upload'>('upload');
  const [showTableModal, setShowTableModal] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const [showTableMenu, setShowTableMenu] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [embedUrl, setEmbedUrl] = useState("");
  const [embedType, setEmbedType] = useState<'youtube' | 'tiktok'>('youtube');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [wordCount, setWordCount] = useState({ words: 0, characters: 0 });
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState('javascript');
  const [codeContent, setCodeContent] = useState('');

  const textColors = [
    '#000000', '#374151', '#6B7280', '#9CA3AF',
    '#EF4444', '#F59E0B', '#10B981', '#3B82F6',
    '#8B5CF6', '#EC4899', '#FFFFFF',
  ];

  const lowlight = createLowlight(common);

  const highlightColors = [
    { name: 'Yellow', color: '#fbbf24' },
    { name: 'Green', color: '#4ade80' },
    { name: 'Blue', color: '#60a5fa' },
    { name: 'Pink', color: '#f472b6' },
    { name: 'Purple', color: '#a78bfa' },
    { name: 'Orange', color: '#fb923c' },
    { name: 'Red', color: '#f87171' },
    { name: 'Teal', color: '#2dd4bf' },
  ];

  const editor = useEditor({
    immediatelyRender: false,
    editable,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline hover:text-blue-600 cursor-pointer",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg my-4",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "border-collapse table-auto w-full my-4",
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Youtube.configure({
        controls: true,
        nocookie: true,
        width: 640,
        height: 360,
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'code-block',
        },
      }).extend({
        addAttributes() {
          return {
            ...this.parent?.(),
            language: {
              default: 'javascript',
              parseHTML: element => element.getAttribute('data-language'),
              renderHTML: attributes => ({
                'data-language': attributes.language,
              }),
            },
          };
        },
      }),
      Subscript,
      Superscript,
      TextStyle,
      Color,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      // Update word count
      const text = editor.getText();
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      const characters = text.length;
      setWordCount({ words, characters });
    },
  });

  // Initialize word count
  useEffect(() => {
    if (editor) {
      const text = editor.getText();
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      const characters = text.length;
      setWordCount({ words, characters });
    }
  }, [editor]);

  // Add click handler for code blocks to copy
  useEffect(() => {
    const handleCodeClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Match any pre element (code blocks)
      const pre = target.closest('pre');
      
      if (pre && pre.querySelector('code')) {
        const rect = pre.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        // Check if clicked in copy button area (top-right corner)
        // Copy button is roughly 100px wide and 50px tall from top-right
        if (clickX > rect.width - 100 && clickY < 50) {
          const code = pre.querySelector('code');
          if (code) {
            const textToCopy = code.textContent || '';
            console.log('Copying:', textToCopy.substring(0, 50) + '...'); // Debug
            
            navigator.clipboard.writeText(textToCopy).then(() => {
              console.log('Copy successful!'); // Debug
              pre.classList.add('copied');
              setTimeout(() => pre.classList.remove('copied'), 2000);
            }).catch(err => {
              console.error('Copy failed:', err);
              alert('Failed to copy code. Please try again.');
            });
          }
        }
      }
    };

    document.addEventListener('click', handleCodeClick);
    return () => document.removeEventListener('click', handleCodeClick);
  }, []);

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await uploadResponse.json();
      
      if (data.url) {
        setImageUrl(data.url);
      } else {
        throw new Error('Upload failed: No URL returned');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload ảnh thất bại. Vui lòng thử lại.');
    } finally {
      setIsUploading(false);
    }
  };

  const insertImage = () => {
    if (!editor || !imageUrl) return;

    let html = `<figure><img src="${imageUrl}" alt="${imageAlt}" />`;
    if (imageCaption) {
      html += `<figcaption>${imageCaption}</figcaption>`;
    }
    html += `</figure>`;

    editor.chain().focus().insertContent(html).run();
    
    // Reset and close
    setShowImageModal(false);
    setImageUrl('');
    setImageAlt('');
    setImageCaption('');
    setUploadMode('upload');
  };

  const setLink = useCallback(() => {
    if (!editor) return;
    
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const insertTable = () => {
    if (!editor) return;
    editor.chain().focus().insertTable({ rows: tableRows, cols: tableCols, withHeaderRow: true }).run();
    setShowTableModal(false);
    setTableRows(3);
    setTableCols(3);
  };

  const insertEmbed = () => {
    if (!editor || !embedUrl) return;

    if (embedType === 'youtube') {
      editor.chain().focus().setYoutubeVideo({ src: embedUrl }).run();
    } else if (embedType === 'tiktok') {
      // TikTok embed using iframe
      const tiktokId = embedUrl.match(/\/(\d+)/);
      if (tiktokId) {
        const embedCode = `<iframe src="https://www.tiktok.com/embed/v2/${tiktokId[1]}" width="325" height="575" frameborder="0" allowfullscreen style="margin: 1rem auto; display: block;"></iframe>`;
        editor.chain().focus().insertContent(embedCode).run();
      }
    }

    setShowEmbedModal(false);
    setEmbedUrl('');
    setEmbedType('youtube');
  };

  const insertCodeBlock = () => {
    if (!editor) return;
    
    if (codeContent) {
      editor.chain().focus().insertContent({
        type: 'codeBlock',
        attrs: { language: codeLanguage },
        content: [{ type: 'text', text: codeContent }],
      }).run();
    } else {
      editor.chain().focus().setCodeBlock({ language: codeLanguage }).run();
    }

    setShowCodeModal(false);
    setCodeContent('');
    setCodeLanguage('javascript');
  };

  if (!editor) return null;

  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-[#0a0a0a]" : "bg-white";
  const borderColor = isDark ? "border-neutral-700" : "border-neutral-300";
  const toolbarBg = isDark ? "bg-[#0a0a0a]" : "bg-neutral-50";
  const buttonHover = isDark ? "hover:bg-neutral-800" : "hover:bg-neutral-200";
  const activeButton = isDark ? "bg-neutral-800 text-white" : "bg-neutral-300 text-black";
  const inactiveButton = isDark ? "text-neutral-400" : "text-neutral-600";

  return (
    <div className={`w-full border ${borderColor} rounded-lg overflow-hidden flex flex-col ${bgColor}`}>
      {editable && (
        <div className={`flex-shrink-0 flex flex-wrap items-center gap-1 px-3 py-2 border-b ${borderColor} ${toolbarBg}`}>
          {/* Text Formatting */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`p-2 rounded ${buttonHover} transition-colors ${
              editor.isActive("bold") ? activeButton : inactiveButton
            }`}
            title="Bold"
          >
            <BsTypeBold className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`p-2 rounded ${buttonHover} transition-colors ${
              editor.isActive("italic") ? activeButton : inactiveButton
            }`}
            title="Italic"
          >
            <BsTypeItalic className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            className={`p-2 rounded ${buttonHover} transition-colors ${
              editor.isActive("underline") ? activeButton : inactiveButton
            }`}
            title="Underline"
          >
            <BsTypeUnderline className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={`p-2 rounded ${buttonHover} transition-colors ${
              editor.isActive("strike") ? activeButton : inactiveButton
            }`}
            title="Strikethrough"
          >
            <BsTypeStrikethrough className="w-4 h-4" />
          </button>

          <div className={`w-[1px] h-6 ${isDark ? "bg-neutral-700" : "bg-neutral-300"} mx-1`} />

          {/* Headings */}
          {[1, 2, 3, 4, 5, 6].map((level) => (
            <button
              type="button"
              key={level}
              onClick={() => editor.chain().focus().toggleHeading({ level: level as any }).run()}
              className={`px-2 py-1 rounded ${buttonHover} transition-colors text-sm font-semibold ${
                editor.isActive("heading", { level }) ? activeButton : inactiveButton
              }`}
              title={`Heading ${level}`}
            >
              H{level}
            </button>
          ))}

          <div className="w-[1px] h-6 bg-neutral-700 mx-1" />

          {/* Lists */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded ${buttonHover} transition-colors ${
              editor.isActive("bulletList") ? activeButton : inactiveButton
            }`}
            title="Bullet List"
          >
            <BsListUl className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded ${buttonHover} transition-colors ${
              editor.isActive("orderedList") ? activeButton : inactiveButton
            }`}
            title="Numbered List"
          >
            <BsListOl className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={`p-2 rounded ${buttonHover} transition-colors ${
              editor.isActive("taskList") ? activeButton : inactiveButton
            }`}
            title="Task List"
          >
            <BsListCheck className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-6 bg-neutral-700 mx-1" />

          {/* Alignment */}
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={`p-2 rounded ${buttonHover} transition-colors ${
              editor.isActive({ textAlign: "left" }) ? activeButton : inactiveButton
            }`}
            title="Align Left"
          >
            <BsTextLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={`p-2 rounded ${buttonHover} transition-colors ${
              editor.isActive({ textAlign: "center" }) ? activeButton : inactiveButton
            }`}
            title="Align Center"
          >
            <BsTextCenter className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={`p-2 rounded ${buttonHover} transition-colors ${
              editor.isActive({ textAlign: "right" }) ? activeButton : inactiveButton
            }`}
            title="Align Right"
          >
            <BsTextRight className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-6 bg-neutral-700 mx-1" />

          {/* Quote & Highlight */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded ${buttonHover} transition-colors ${
              editor.isActive("blockquote") ? activeButton : inactiveButton
            }`}
            title="Blockquote"
          >
            <FaQuoteRight className="w-4 h-4" />
          </button>

          <div className="relative inline-block">
            <button
              type="button"
              onClick={() => setShowHighlightPicker(!showHighlightPicker)}
              className={`p-2 rounded ${buttonHover} transition-colors ${
                editor.isActive("highlight") ? activeButton : inactiveButton
              }`}
              title="Highlight"
            >
              <LuHighlighter className="w-4 h-4" />
            </button>
            {showHighlightPicker && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowHighlightPicker(false)} />
                <div className={`absolute top-full left-0 mt-2 z-40 ${isDark ? 'bg-neutral-900 border-neutral-600' : 'bg-white border-neutral-300'} border-2 rounded-lg shadow-2xl p-3 min-w-[180px]`}>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {highlightColors.map((item) => (
                      <button
                        type="button"
                        key={item.color}
                        onClick={(e) => {
                          e.stopPropagation();
                          editor.chain().focus().toggleHighlight({ color: item.color }).run();
                          setShowHighlightPicker(false);
                        }}
                        className="w-9 h-9 rounded-full hover:scale-110 transition-transform border-2 shadow-md"
                        style={{ 
                          backgroundColor: item.color,
                          borderColor: isDark ? '#525252' : '#d4d4d4'
                        }}
                        title={item.name}
                      />
                    ))}
                  </div>
                  <div className={`w-full h-[1px] ${isDark ? 'bg-neutral-700' : 'bg-neutral-300'} mb-2`} />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      editor.chain().focus().unsetHighlight().run();
                      setShowHighlightPicker(false);
                    }}
                    className={`w-full px-3 py-2 text-sm rounded ${buttonHover} ${inactiveButton} font-medium`}
                  >
                    Xóa highlight
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="w-[1px] h-6 bg-neutral-700 mx-1" />

          {/* Link & Image */}
          <button
            type="button"
            onClick={setLink}
            className={`p-2 rounded ${buttonHover} transition-colors ${
              editor.isActive("link") ? activeButton : inactiveButton
            }`}
            title="Add Link"
          >
            <BsLink45Deg className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setShowImageModal(true)}
            className={`p-2 rounded ${buttonHover} transition-colors ${inactiveButton}`}
            title="Add Image"
          >
            <BsImage className="w-4 h-4" />
          </button>

          <div className="relative inline-block">
            <button
              type="button"
              onClick={() => {
                if (editor?.isActive('table')) {
                  setShowTableMenu(!showTableMenu);
                } else {
                  setShowTableModal(true);
                }
              }}
              className={`p-2 rounded ${buttonHover} transition-colors ${
                editor?.isActive('table') ? activeButton : inactiveButton
              }`}
              title="Table"
            >
              <BsTable className="w-4 h-4" />
            </button>
            {showTableMenu && editor?.isActive('table') && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowTableMenu(false)} />
                <div className={`absolute top-full left-0 mt-2 z-40 ${isDark ? 'bg-neutral-900 border-neutral-600' : 'bg-white border-neutral-300'} border-2 rounded-lg shadow-2xl p-2 min-w-[200px]`}>
                  <button
                    type="button"
                    onClick={() => { editor.chain().focus().addColumnBefore().run(); setShowTableMenu(false); }}
                    className={`w-full text-left px-3 py-2 text-sm rounded ${buttonHover} ${inactiveButton}`}
                  >
                    Thêm cột trước
                  </button>
                  <button
                    type="button"
                    onClick={() => { editor.chain().focus().addColumnAfter().run(); setShowTableMenu(false); }}
                    className={`w-full text-left px-3 py-2 text-sm rounded ${buttonHover} ${inactiveButton}`}
                  >
                    Thêm cột sau
                  </button>
                  <button
                    type="button"
                    onClick={() => { editor.chain().focus().deleteColumn().run(); setShowTableMenu(false); }}
                    className={`w-full text-left px-3 py-2 text-sm rounded ${buttonHover} text-red-500`}
                  >
                    Xóa cột
                  </button>
                  <div className={`w-full h-[1px] ${isDark ? 'bg-neutral-700' : 'bg-neutral-300'} my-2`} />
                  <button
                    type="button"
                    onClick={() => { editor.chain().focus().addRowBefore().run(); setShowTableMenu(false); }}
                    className={`w-full text-left px-3 py-2 text-sm rounded ${buttonHover} ${inactiveButton}`}
                  >
                    Thêm hàng trước
                  </button>
                  <button
                    type="button"
                    onClick={() => { editor.chain().focus().addRowAfter().run(); setShowTableMenu(false); }}
                    className={`w-full text-left px-3 py-2 text-sm rounded ${buttonHover} ${inactiveButton}`}
                  >
                    Thêm hàng sau
                  </button>
                  <button
                    type="button"
                    onClick={() => { editor.chain().focus().deleteRow().run(); setShowTableMenu(false); }}
                    className={`w-full text-left px-3 py-2 text-sm rounded ${buttonHover} text-red-500`}
                  >
                    Xóa hàng
                  </button>
                  <div className={`w-full h-[1px] ${isDark ? 'bg-neutral-700' : 'bg-neutral-300'} my-2`} />
                  <button
                    type="button"
                    onClick={() => { editor.chain().focus().deleteTable().run(); setShowTableMenu(false); }}
                    className={`w-full text-left px-3 py-2 text-sm rounded ${buttonHover} text-red-500 font-medium`}
                  >
                    Xóa toàn bộ bảng
                  </button>
                </div>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowEmbedModal(true)}
            className={`p-2 rounded ${buttonHover} transition-colors ${inactiveButton}`}
            title="Embed Video"
          >
            <BsYoutube className="w-4 h-4" />
          </button>

          <div className={`w-[1px] h-6 ${isDark ? "bg-neutral-700" : "bg-neutral-300"} mx-1`} />

          {/* Code Block */}
          <button
            type="button"
            onClick={() => setShowCodeModal(true)}
            className={`p-2 rounded ${buttonHover} transition-colors ${
              editor.isActive("codeBlock") ? activeButton : inactiveButton
            }`}
            title="Code Block"
          >
            <MdCode className="w-4 h-4" />
          </button>

          {/* Horizontal Rule */}
          <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className={`p-2 rounded ${buttonHover} transition-colors ${inactiveButton}`}
            title="Horizontal Line"
          >
            <MdHorizontalRule className="w-4 h-4" />
          </button>

          <div className={`w-[1px] h-6 ${isDark ? "bg-neutral-700" : "bg-neutral-300"} mx-1`} />

          {/* Text Color */}
          <div className="relative inline-block">
            <button
              type="button"
              onClick={() => setShowColorPicker(!showColorPicker)}
              className={`p-2 rounded ${buttonHover} transition-colors ${inactiveButton}`}
              title="Text Color"
            >
              <MdFormatColorText className="w-4 h-4" />
            </button>
            {showColorPicker && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowColorPicker(false)} />
                <div className={`absolute top-full left-0 mt-2 z-40 ${isDark ? 'bg-neutral-900 border-neutral-600' : 'bg-white border-neutral-300'} border-2 rounded-lg shadow-2xl p-3 min-w-[180px]`}>
                  <div className="grid grid-cols-4 gap-2">
                    {textColors.map((color) => (
                      <button
                        type="button"
                        key={color}
                        onClick={() => {
                          editor.chain().focus().setColor(color).run();
                          setShowColorPicker(false);
                        }}
                        className="w-8 h-8 rounded border-2 hover:scale-110 transition-transform"
                        style={{ backgroundColor: color, borderColor: isDark ? '#525252' : '#d4d4d4' }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Subscript & Superscript */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            className={`p-2 rounded ${buttonHover} transition-colors ${
              editor.isActive("subscript") ? activeButton : inactiveButton
            }`}
            title="Subscript"
          >
            <MdSubscript className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            className={`p-2 rounded ${buttonHover} transition-colors ${
              editor.isActive("superscript") ? activeButton : inactiveButton
            }`}
            title="Superscript"
          >
            <MdSuperscript className="w-4 h-4" />
          </button>

          {/* Clear Formatting */}
          <button
            type="button"
            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
            className={`p-2 rounded ${buttonHover} transition-colors ${inactiveButton}`}
            title="Clear Formatting"
          >
            <MdFormatClear className="w-4 h-4" />
          </button>

          <div className={`w-[1px] h-6 ${isDark ? "bg-neutral-700" : "bg-neutral-300"} mx-1`} />

          {/* Undo/Redo */}
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            className={`p-2 rounded ${buttonHover} transition-colors ${inactiveButton} disabled:opacity-30`}
            title="Undo"
          >
            <LuUndo2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            className={`p-2 rounded ${buttonHover} transition-colors ${inactiveButton} disabled:opacity-30`}
            title="Redo"
          >
            <LuRedo2 className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className={`flex-1 overflow-y-auto ${bgColor}`} style={{ maxHeight: minHeight }}>
        <EditorContent 
          editor={editor}
          className={`prose ${isDark ? 'prose-invert' : ''} max-w-none px-8 py-6 focus:outline-none`}
          style={{ minHeight }}
        />
      </div>

      {/* Word Count Footer */}
      {editable && (
        <div className={`flex-shrink-0 px-4 py-2 border-t ${borderColor} ${toolbarBg}`}>
          <div className="flex items-center justify-between text-xs">
            <span className={inactiveButton}>
              {wordCount.words} từ • {wordCount.characters} ký tự
            </span>
          </div>
        </div>
      )}

      {/* Code Block Modal */}
      {showCodeModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowCodeModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl">
            <div className={`${isDark ? 'bg-neutral-900 border-neutral-700' : 'bg-white border-neutral-300'} border-2 rounded-lg shadow-2xl p-6`}>
              <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Chèn Code Block</h3>
              
              {/* Language Selector */}
              <div className="mb-4">
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  Ngôn ngữ
                </label>
                <select
                  value={codeLanguage}
                  onChange={(e) => setCodeLanguage(e.target.value)}
                  className={`w-full px-4 py-2 rounded border ${isDark ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-300 text-black'}`}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                  <option value="csharp">C#</option>
                  <option value="php">PHP</option>
                  <option value="ruby">Ruby</option>
                  <option value="go">Go</option>
                  <option value="rust">Rust</option>
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="sql">SQL</option>
                  <option value="bash">Bash</option>
                  <option value="json">JSON</option>
                  <option value="xml">XML</option>
                  <option value="yaml">YAML</option>
                  <option value="markdown">Markdown</option>
                </select>
              </div>

              {/* Code Input */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  Code (tùy chọn)
                </label>
                <textarea
                  value={codeContent}
                  onChange={(e) => setCodeContent(e.target.value)}
                  placeholder="Nhập code hoặc để trống để tạo block rỗng..."
                  rows={10}
                  className={`w-full px-4 py-3 rounded border font-mono text-sm ${isDark ? 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500' : 'bg-white border-neutral-300 text-black placeholder-neutral-400'}`}
                />
                <p className={`text-xs mt-1 ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>
                  Nếu để trống, sẽ tạo một code block rỗng để bạn gõ code trực tiếp trong editor.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCodeModal(false);
                    setCodeContent('');
                    setCodeLanguage('javascript');
                  }}
                  className={`flex-1 px-4 py-2 rounded ${buttonHover} ${inactiveButton}`}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={insertCodeBlock}
                  className="flex-1 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Chèn code
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Embed Modal */}
      {showEmbedModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowEmbedModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg">
            <div className={`${isDark ? 'bg-neutral-900 border-neutral-700' : 'bg-white border-neutral-300'} border-2 rounded-lg shadow-2xl p-6`}>
              <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Embed Video</h3>
              
              {/* Platform Toggle */}
              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setEmbedType('youtube')}
                  className={`flex-1 px-4 py-2 rounded transition-colors flex items-center justify-center gap-2 ${
                    embedType === 'youtube'
                      ? 'bg-red-600 text-white'
                      : `${isDark ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-200 text-neutral-600'}`
                  }`}
                >
                  <BsYoutube className="w-5 h-5" />
                  YouTube
                </button>
                <button
                  type="button"
                  onClick={() => setEmbedType('tiktok')}
                  className={`flex-1 px-4 py-2 rounded transition-colors flex items-center justify-center gap-2 ${
                    embedType === 'tiktok'
                      ? 'bg-black text-white'
                      : `${isDark ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-200 text-neutral-600'}`
                  }`}
                >
                  <FaTiktok className="w-4 h-4" />
                  TikTok
                </button>
              </div>

              {/* URL Input */}
              <div className="mb-4">
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  {embedType === 'youtube' ? 'YouTube URL' : 'TikTok URL'}
                </label>
                <input
                  type="url"
                  value={embedUrl}
                  onChange={(e) => setEmbedUrl(e.target.value)}
                  placeholder={embedType === 'youtube' ? 'https://www.youtube.com/watch?v=...' : 'https://www.tiktok.com/@username/video/...'}
                  className={`w-full px-4 py-2 rounded border ${isDark ? 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500' : 'bg-white border-neutral-300 text-black placeholder-neutral-400'}`}
                />
              </div>

              {/* Help Text */}
              <div className={`mb-6 text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>
                {embedType === 'youtube' ? (
                  <p>Chèn link YouTube hoặc Shorts. Ví dụ: https://youtu.be/dQw4w9WgXcQ</p>
                ) : (
                  <p>Chèn link TikTok video. Ví dụ: https://www.tiktok.com/@user/video/1234567890</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEmbedModal(false);
                    setEmbedUrl('');
                    setEmbedType('youtube');
                  }}
                  className={`flex-1 px-4 py-2 rounded ${buttonHover} ${inactiveButton}`}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={insertEmbed}
                  disabled={!embedUrl}
                  className={`flex-1 px-4 py-2 rounded ${
                    embedType === 'youtube' ? 'bg-red-600 hover:bg-red-700' : 'bg-black hover:bg-neutral-800'
                  } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Chèn video
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Table Modal */}
      {showTableModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowTableModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
            <div className={`${isDark ? 'bg-neutral-900 border-neutral-700' : 'bg-white border-neutral-300'} border-2 rounded-lg shadow-2xl p-6`}>
              <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Tạo bảng mới</h3>
              
              {/* Row Input */}
              <div className="mb-4">
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  Số hàng
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={tableRows}
                  onChange={(e) => setTableRows(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                  className={`w-full px-4 py-2 rounded border ${isDark ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-300 text-black'}`}
                />
              </div>

              {/* Column Input */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  Số cột
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={tableCols}
                  onChange={(e) => setTableCols(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                  className={`w-full px-4 py-2 rounded border ${isDark ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-300 text-black'}`}
                />
              </div>

              {/* Preview */}
              <div className="mb-6">
                <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'} text-center`}>
                  Bảng {tableRows} x {tableCols} (hàng x cột)
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowTableModal(false);
                    setTableRows(3);
                    setTableCols(3);
                  }}
                  className={`flex-1 px-4 py-2 rounded ${buttonHover} ${inactiveButton}`}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={insertTable}
                  className="flex-1 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Tạo bảng
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowImageModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg">
            <div className={`${isDark ? 'bg-neutral-900 border-neutral-700' : 'bg-white border-neutral-300'} border-2 rounded-lg shadow-2xl p-6`}>
              <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Thêm ảnh</h3>
              
              {/* Mode Toggle */}
              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setUploadMode('upload')}
                  className={`flex-1 px-4 py-2 rounded transition-colors ${
                    uploadMode === 'upload'
                      ? 'bg-blue-600 text-white'
                      : `${isDark ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-200 text-neutral-600'}`
                  }`}
                >
                  Upload file
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMode('url')}
                  className={`flex-1 px-4 py-2 rounded transition-colors ${
                    uploadMode === 'url'
                      ? 'bg-blue-600 text-white'
                      : `${isDark ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-200 text-neutral-600'}`
                  }`}
                >
                  Nhập URL
                </button>
              </div>

              {/* Upload/URL Input */}
              {uploadMode === 'upload' ? (
                <div className="mb-4">
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    Chọn file ảnh
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                    className={`w-full px-4 py-2 rounded border ${isDark ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-300 text-black'}`}
                    disabled={isUploading}
                  />
                  {isUploading && (
                    <p className="text-sm text-blue-500 mt-2">Đang upload...</p>
                  )}
                </div>
              ) : (
                <div className="mb-4">
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    URL ảnh
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className={`w-full px-4 py-2 rounded border ${isDark ? 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500' : 'bg-white border-neutral-300 text-black placeholder-neutral-400'}`}
                  />
                </div>
              )}

              {/* Alt Text */}
              <div className="mb-4">
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  Alt text (mô tả ảnh)
                </label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Mô tả ngắn gọn về ảnh..."
                  className={`w-full px-4 py-2 rounded border ${isDark ? 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500' : 'bg-white border-neutral-300 text-black placeholder-neutral-400'}`}
                />
              </div>

              {/* Caption */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  Caption (chú thích)
                </label>
                <input
                  type="text"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  placeholder="Chú thích hiển thị bên dưới ảnh..."
                  className={`w-full px-4 py-2 rounded border ${isDark ? 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500' : 'bg-white border-neutral-300 text-black placeholder-neutral-400'}`}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowImageModal(false);
                    setImageUrl('');
                    setImageAlt('');
                    setImageCaption('');
                    setUploadMode('upload');
                  }}
                  className={`flex-1 px-4 py-2 rounded ${buttonHover} ${inactiveButton}`}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={insertImage}
                  disabled={!imageUrl || isUploading}
                  className="flex-1 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Chèn ảnh
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx global>{`
        .ProseMirror {
          min-height: ${minHeight};
          outline: none;
        }

        .ProseMirror p {
          margin: 0.5rem 0;
          color: ${isDark ? '#d4d4d4' : '#404040'};
        }

        .ProseMirror h1 { font-size: 2.25rem; font-weight: bold; margin: 1.5rem 0 1rem; color: ${isDark ? 'white' : 'black'}; }
        .ProseMirror h2 { font-size: 1.875rem; font-weight: bold; margin: 1.25rem 0 0.75rem; color: ${isDark ? 'white' : 'black'}; }
        .ProseMirror h3 { font-size: 1.5rem; font-weight: bold; margin: 1rem 0 0.5rem; color: ${isDark ? 'white' : 'black'}; }
        .ProseMirror h4 { font-size: 1.25rem; font-weight: bold; margin: 0.75rem 0 0.5rem; color: ${isDark ? 'white' : 'black'}; }
        .ProseMirror h5 { font-size: 1.125rem; font-weight: bold; margin: 0.5rem 0; color: ${isDark ? 'white' : 'black'}; }
        .ProseMirror h6 { font-size: 1rem; font-weight: bold; margin: 0.5rem 0; color: ${isDark ? 'white' : 'black'}; }

        .ProseMirror ul {
          list-style-type: disc;
          padding-left: 2rem;
          margin: 0.5rem 0;
          color: ${isDark ? '#d4d4d4' : '#404040'};
        }

        .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 2rem;
          margin: 0.5rem 0;
          color: ${isDark ? '#d4d4d4' : '#404040'};
        }

        .ProseMirror ul li,
        .ProseMirror ol li {
          display: list-item;
        }

        .ProseMirror ul[data-type="taskList"] {
          list-style: none;
          padding-left: 0;
        }

        .ProseMirror ul[data-type="taskList"] li {
          display: flex;
          align-items: flex-start;
        }

        .ProseMirror ul[data-type="taskList"] li input {
          margin-right: 0.5rem;
        }

        .ProseMirror blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1rem;
          margin: 1rem 0;
          color: #a3a3a3;
          font-style: italic;
        }

        .ProseMirror mark {
          padding: 0.125rem 0.25rem;
          border-radius: 0.125rem;
        }

        .ProseMirror mark[data-color="#fbbf24"] { background-color: #fbbf24; color: black; }
        .ProseMirror mark[data-color="#4ade80"] { background-color: #4ade80; color: black; }
        .ProseMirror mark[data-color="#60a5fa"] { background-color: #60a5fa; color: black; }
        .ProseMirror mark[data-color="#f472b6"] { background-color: #f472b6; color: black; }
        .ProseMirror mark[data-color="#a78bfa"] { background-color: #a78bfa; color: black; }
        .ProseMirror mark[data-color="#fb923c"] { background-color: #fb923c; color: black; }
        .ProseMirror mark[data-color="#f87171"] { background-color: #f87171; color: white; }
        .ProseMirror mark[data-color="#2dd4bf"] { background-color: #2dd4bf; color: black; }

        .ProseMirror table {
          border-collapse: collapse;
          width: 100%;
          margin: 1rem 0;
          overflow: hidden;
        }

        .ProseMirror table td,
        .ProseMirror table th {
          border: 1px solid ${isDark ? '#404040' : '#d4d4d4'};
          padding: 0.5rem 0.75rem;
          text-align: left;
          color: ${isDark ? '#d4d4d4' : '#404040'};
        }

        .ProseMirror table th {
          background-color: ${isDark ? '#262626' : '#f5f5f5'};
          font-weight: bold;
          color: ${isDark ? 'white' : 'black'};
        }

        .ProseMirror figure {
          margin: 1.5rem 0;
        }

        .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          display: block;
        }

        .ProseMirror figcaption {
          text-align: center;
          font-size: 0.875rem;
          color: ${isDark ? '#a3a3a3' : '#737373'};
          margin-top: 0.5rem;
          font-style: italic;
        }

        .ProseMirror a {
          color: #3b82f6;
          text-decoration: underline;
          cursor: pointer;
        }

        .ProseMirror a:hover {
          color: #60a5fa;
        }

        .ProseMirror iframe {
          max-width: 100%;
          border-radius: 0.5rem;
          margin: 1.5rem auto;
          display: block;
        }

        .ProseMirror div[data-youtube-video] {
          margin: 1.5rem 0;
        }

        .ProseMirror div[data-youtube-video] iframe {
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 0.5rem;
        }

        .ProseMirror pre {
          position: relative;
          background: ${isDark ? '#1e1e1e' : '#f5f5f5'};
          border: 1px solid ${isDark ? '#404040' : '#d4d4d4'};
          border-radius: 0.5rem;
          padding: 3rem 1rem 1rem 1rem;
          margin: 1rem 0;
          overflow-x: auto;
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .ProseMirror pre::before {
          content: attr(data-language);
          position: absolute;
          top: 0.5rem;
          left: 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          color: ${isDark ? '#9ca3af' : '#6b7280'};
          letter-spacing: 0.05em;
        }

        .ProseMirror pre::after {
          content: 'Copy';
          position: absolute;
          top: 0.5rem;
          right: 1rem;
          font-size: 0.75rem;
          padding: 0.375rem 0.75rem;
          background: ${isDark ? '#374151' : '#e5e7eb'};
          color: ${isDark ? '#d1d5db' : '#374151'};
          border-radius: 0.375rem;
          cursor: pointer;
          font-family: system-ui, -apple-system, sans-serif;
          transition: all 0.2s;
          pointer-events: auto;
          font-weight: 500;
        }

        .ProseMirror pre:hover::after {
          background: ${isDark ? '#4b5563' : '#d1d5db'};
        }

        .ProseMirror pre.copied::after {
          content: 'Copied!';
          background: ${isDark ? '#10b981' : '#059669'};
          color: white;
        }

        .ProseMirror pre code {
          background: none;
          padding: 0;
          border-radius: 0;
          font-size: inherit;
          color: ${isDark ? '#d4d4d4' : '#1e1e1e'};
        }

        .ProseMirror code {
          background: ${isDark ? '#2d2d2d' : '#e5e5e5'};
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.875rem;
          color: ${isDark ? '#e879f9' : '#c026d3'};
        }

        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #737373;
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  );
}
