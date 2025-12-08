import React, { useRef, useEffect } from 'react';
import { Copy, Download, Loader2, FileText, Check, Stamp, PenLine, X } from 'lucide-react';

interface DocumentViewerProps {
  content: string;
  onChange: (newContent: string) => void;
  isGenerating: boolean;
  status: string;
  onClose: () => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ content, onChange, isGenerating, status, onClose }) => {
  const [copied, setCopied] = React.useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea to fit content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [content]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "FounderForms_Document.txt";
    document.body.appendChild(element); 
    element.click();
    document.body.removeChild(element);
  };

  const handleAddSignature = () => {
    const signatureBlock = `
\n\nIN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

[COMPANY NAME]

By: _______________________________
Name: _____________________________
Title: ____________________________
Date: _____________________________


[COUNTERPARTY NAME]

By: _______________________________
Name: _____________________________
Title: ____________________________
Date: _____________________________
`;
    onChange(content + signatureBlock);
    
    setTimeout(() => {
        if (textareaRef.current) {
            textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
        }
    }, 100);
  };

  const handleAddNotary = () => {
    const notaryBlock = `
--------------------------------------------------------------------------------
NOTARY ACKNOWLEDGMENT

State of _________________
County of _________________

On this ____ day of ________, 20__, before me, __________________________, a Notary Public, personally appeared __________________________, who proved to me on the basis of satisfactory evidence to be the person(s) whose name(s) is/are subscribed to the within instrument and acknowledged to me that he/she/they executed the same in his/her/their authorized capacity(ies), and that by his/her/their signature(s) on the instrument the person(s), or the entity upon behalf of which the person(s) acted, executed the instrument.

I certify under PENALTY OF PERJURY under the laws of the State of _________________ that the foregoing paragraph is true and correct.

WITNESS my hand and official seal.

Signature: __________________________
(Seal)
--------------------------------------------------------------------------------
`;
    onChange(content + notaryBlock);
    
    // Scroll to bottom to show the new block
    setTimeout(() => {
        if (textareaRef.current) {
            textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
        }
    }, 100);
  };

  return (
    <div className="flex flex-col h-full bg-white border-l border-stone-200 relative shadow-xl shadow-stone-200/50">
      {/* Artifact Header */}
      <div className="bg-[#fcfbf9] border-b border-stone-200 px-4 py-3 flex justify-between items-center z-10 flex-shrink-0">
        <div className="flex items-center gap-3">
             <button 
                onClick={onClose}
                className="text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 p-1 rounded-md transition-colors"
                title="Close Editor"
            >
                <X size={18} />
            </button>
            <div className="h-4 w-px bg-stone-300"></div>
            <div className="flex items-center gap-2 text-stone-500">
                <FileText size={16} />
                <span className="text-xs font-semibold uppercase tracking-wide">Document Editor</span>
                {isGenerating && <Loader2 size={12} className="animate-spin text-stone-400" />}
            </div>
        </div>
        
        <div className="flex gap-1">
           <button 
            onClick={handleAddSignature}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-200/50 rounded-md transition-colors"
            title="Insert Signature Block"
            disabled={isGenerating}
          >
            <PenLine size={14} /> <span className="hidden sm:inline">Add Signature</span>
          </button>
           <button 
            onClick={handleAddNotary}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-200/50 rounded-md transition-colors"
            title="Insert Notary Block"
            disabled={isGenerating}
          >
            <Stamp size={14} /> <span className="hidden sm:inline">Add Notary</span>
          </button>
          <div className="w-px h-4 bg-stone-300 mx-1 self-center"></div>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-200/50 rounded-md transition-colors"
            title="Copy to clipboard"
          >
            {copied ? <Check size={14} className="text-green-600"/> : <Copy size={14} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button 
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-200/50 rounded-md transition-colors"
            title="Download"
          >
            <Download size={14} /> <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto bg-white doc-scroll relative">
        <div className="max-w-[850px] mx-auto min-h-full flex flex-col bg-white">
          
          {/* Editable Text Area */}
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => onChange(e.target.value)}
            disabled={isGenerating}
            placeholder={isGenerating ? "Drafting document..." : "Start typing or generate a document..."}
            className="flex-1 w-full min-h-[80vh] resize-none outline-none border-none bg-transparent font-serif text-stone-900 whitespace-pre-wrap leading-relaxed text-[13px] text-justify selection:bg-stone-200 placeholder:text-stone-300 break-words py-10 px-8 md:px-16"
            spellCheck={false}
          />

          {/* Timestamp footer for official feel */}
          {content && !isGenerating && (
            <div className="mt-8 pt-6 border-t border-stone-100 text-center select-none pb-12 mx-16 mb-8">
                <p className="text-[9px] text-stone-400 font-sans uppercase tracking-widest">
                    Generated by FounderForms AI • {new Date().toLocaleDateString()}
                </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};