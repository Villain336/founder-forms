import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { DocumentViewer } from './components/DocumentViewer';
import { DocumentTemplate, GenerationStatus, ChatMessage } from './types';
import { streamDocumentGeneration } from './services/geminiService';
import { ArrowUp, User, FileText } from 'lucide-react';

// Extracted InputArea component to prevent re-rendering/focus loss issues
interface InputAreaProps {
  prompt: string;
  setPrompt: (value: string) => void;
  handleGenerate: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  status: GenerationStatus;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  selectedTemplate: DocumentTemplate | null;
  centered?: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ 
  prompt, 
  setPrompt, 
  handleGenerate, 
  handleKeyDown, 
  status, 
  textareaRef, 
  selectedTemplate, 
  centered = false 
}) => (
  <div className={`relative group bg-white rounded-2xl border border-stone-200 transition-all duration-300
      ${centered 
          ? 'shadow-lg shadow-stone-200/50 hover:shadow-xl hover:shadow-stone-200/60 focus-within:ring-2 focus-within:ring-stone-200 focus-within:border-stone-400' 
          : 'shadow-sm focus-within:ring-2 focus-within:ring-stone-200 focus-within:border-stone-400'
      }
  `}>
      <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={selectedTemplate ? `Drafting ${selectedTemplate.name}...` : "Describe a document to generate (e.g., 'NDA for a graphic designer')..."}
          className={`w-full bg-transparent border-none focus:ring-0 resize-none text-stone-800 placeholder:text-stone-400 text-[15px] overflow-hidden
              ${centered ? 'py-5 pl-6 pr-14 min-h-[64px]' : 'py-4 pl-4 pr-12 min-h-[52px]'}
          `}
          rows={1}
          disabled={status === 'streaming'}
      />
      <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || status === 'streaming'}
          className={`absolute right-2 p-1.5 rounded-lg transition-all duration-200 flex items-center justify-center
              ${centered ? 'bottom-3' : 'bottom-2'}
              ${!prompt.trim() || status === 'streaming'
                  ? 'bg-stone-100 text-stone-300 cursor-not-allowed'
                  : 'bg-stone-800 text-white hover:bg-black'
              }`}
      >
          {status === 'streaming' ? (
              <div className="w-5 h-5 border-2 border-stone-400 border-t-transparent rounded-full animate-spin"></div>
          ) : (
              <ArrowUp size={18} />
          )}
      </button>
  </div>
);

export default function App() {
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [prompt, setPrompt] = useState('');
  const [documentContent, setDocumentContent] = useState('');
  const [status, setStatus] = useState<GenerationStatus>('idle');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [artifactOpen, setArtifactOpen] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSelectTemplate = (template: DocumentTemplate) => {
    setSelectedTemplate(template);
    setPrompt(template.defaultPrompt);
    // Focus textarea
    setTimeout(() => {
        if(textareaRef.current) {
            textareaRef.current.focus();
            adjustTextareaHeight();
        }
    }, 50);
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  };

  useEffect(() => {
      adjustTextareaHeight();
  }, [prompt]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    const currentPrompt = prompt;
    // Heuristic: If we have existing content and messages, treat this as an edit request
    const isEdit = messages.length > 0 && documentContent.length > 20;
    const contextDoc = isEdit ? documentContent : undefined;

    setPrompt(''); // Clear input
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    // Add User Message
    const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: currentPrompt,
        timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMsg]);
    
    // UI State updates
    setArtifactOpen(true);
    setStatus('loading');
    
    // Clear content to show we are regenerating, but keep copy in contextDoc for fallback
    setDocumentContent('');
    
    // Simulate AI "thinking" delay briefly for UX
    setTimeout(async () => {
        // Add AI placeholder message
        const aiResponseText = isEdit 
            ? "I am updating the document..." 
            : `I'm drafting the ${selectedTemplate?.name || 'document'} for you now.`;

        const aiMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'ai',
            content: aiResponseText,
            timestamp: Date.now()
        };
        setMessages(prev => [...prev, aiMsg]);
        setStatus('streaming');

        try {
            await streamDocumentGeneration(currentPrompt, (chunk) => {
                setDocumentContent(chunk);
            }, contextDoc);
            setStatus('completed');
        } catch (error) {
            console.error(error);
            setStatus('error');
            // RESTORE DOCUMENT ON ERROR
            if (contextDoc) {
                setDocumentContent(contextDoc);
            }
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'ai',
                content: "I encountered an error while generating the document. I have restored your previous version.",
                timestamp: Date.now()
            }]);
        }
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleGenerate();
      }
  };

  return (
    <div className="flex h-screen bg-[#fcfbf9] font-sans text-stone-900 overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:flex flex-shrink-0 z-20 h-full">
          <Sidebar 
            onSelectTemplate={handleSelectTemplate} 
            selectedTemplateId={selectedTemplate?.id}
          />
      </div>

      {/* Main Layout: Split Pane */}
      <div className="flex-1 flex h-full min-w-0 relative">
        
        {/* Chat / Input Column */}
        <div className={`flex flex-col h-full transition-all duration-500 ease-in-out relative z-10
            ${artifactOpen ? 'w-[45%] min-w-[400px] flex-shrink-0 border-r border-stone-200 bg-[#fcfbf9]' : 'w-full mx-auto bg-[#fcfbf9]'}
        `}>
            
            {/* EMPTY STATE: Centered Layout */}
            {messages.length === 0 ? (
                <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-8">
                    <div className="w-full max-w-2xl space-y-8 -mt-20">
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 tracking-tight">
                                FounderForms
                            </h2>
                            <p className="text-stone-500 text-lg">
                                Professional legal documents for high-growth startups.
                            </p>
                        </div>
                        
                        <div className="w-full">
                            <InputArea 
                                prompt={prompt}
                                setPrompt={setPrompt}
                                handleGenerate={handleGenerate}
                                handleKeyDown={handleKeyDown}
                                status={status}
                                textareaRef={textareaRef}
                                selectedTemplate={selectedTemplate}
                                centered={true}
                            />
                            <div className="mt-4 text-center">
                                <p className="text-[11px] text-stone-400">
                                    AI-generated documents. Please review with legal counsel.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                /* ACTIVE STATE: Chat History + Sticky Footer */
                <>
                    {/* Re-open Document Button */}
                    {!artifactOpen && documentContent && (
                        <div className="absolute top-4 right-4 z-30">
                             <button
                                onClick={() => setArtifactOpen(true)}
                                className="bg-white border border-stone-200 shadow-md text-stone-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-stone-50 hover:text-stone-900 transition-all flex items-center gap-2"
                            >
                                <FileText size={16} />
                                View Document
                            </button>
                        </div>
                    )}

                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8 scroll-smooth min-h-0">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.role === 'ai' && (
                                     <div className="w-7 h-7 rounded-sm bg-stone-800 flex items-center justify-center text-white flex-shrink-0 mt-1">
                                         <span className="text-[10px] font-bold">FF</span>
                                     </div>
                                )}
                                
                                <div className={`max-w-[85%] text-[15px] leading-relaxed break-words
                                    ${msg.role === 'user' 
                                        ? 'bg-[#efedea] text-stone-800 px-4 py-3 rounded-2xl rounded-tr-sm' 
                                        : 'text-stone-700 py-2'
                                    }`}>
                                    {msg.content}
                                </div>

                                {msg.role === 'user' && (
                                    <div className="w-7 h-7 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 flex-shrink-0 mt-1">
                                        <User size={14} />
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={chatEndRef} className="h-4"/>
                    </div>

                    <div className="p-4 sm:p-6 bg-[#fcfbf9] flex-shrink-0">
                         <div className="max-w-3xl mx-auto">
                            <InputArea 
                                prompt={prompt}
                                setPrompt={setPrompt}
                                handleGenerate={handleGenerate}
                                handleKeyDown={handleKeyDown}
                                status={status}
                                textareaRef={textareaRef}
                                selectedTemplate={selectedTemplate}
                                centered={false}
                            />
                            <div className="text-center mt-3">
                                <p className="text-[11px] text-stone-400">FounderForms AI can make mistakes. Please review with legal counsel.</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>

        {/* Artifact Column - Document Viewer */}
        {artifactOpen && (
             <div className="flex-1 h-full bg-white overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500 shadow-xl z-20">
                <DocumentViewer 
                    content={documentContent} 
                    onChange={setDocumentContent}
                    isGenerating={status === 'loading' || status === 'streaming'}
                    status={status}
                    onClose={() => setArtifactOpen(false)}
                />
             </div>
        )}
      </div>
    </div>
  );
}