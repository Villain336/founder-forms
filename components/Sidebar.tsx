import React from 'react';
import { TEMPLATES } from '../constants';
import { DocumentTemplate, TemplateCategory } from '../types';
import { ScrollText, Shield, Users, Briefcase, Coins, LayoutDashboard } from 'lucide-react';

interface SidebarProps {
  onSelectTemplate: (template: DocumentTemplate) => void;
  selectedTemplateId?: string;
}

const CategoryIcon = ({ category }: { category: TemplateCategory }) => {
  switch (category) {
    case TemplateCategory.LEGAL: return <Shield className="w-4 h-4" />;
    case TemplateCategory.HR: return <Users className="w-4 h-4" />;
    case TemplateCategory.FUNDRAISING: return <Coins className="w-4 h-4" />;
    case TemplateCategory.OPERATIONS: return <LayoutDashboard className="w-4 h-4" />;
    default: return <ScrollText className="w-4 h-4" />;
  }
};

export const Sidebar: React.FC<SidebarProps> = ({ onSelectTemplate, selectedTemplateId }) => {
  // Group templates by category
  const groupedTemplates = TEMPLATES.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<TemplateCategory, DocumentTemplate[]>);

  return (
    <div className="w-[260px] bg-[#f9f8f6] text-stone-600 flex flex-col h-full border-r border-stone-200 flex-shrink-0">
      <div className="h-14 flex items-center px-5 border-b border-transparent">
        <h1 className="text-lg font-serif font-bold text-stone-800 tracking-tight">FounderForms</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-6 pt-2">
        {Object.entries(groupedTemplates).map(([category, templates]) => (
          <div key={category}>
            <h3 className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-2 px-3">
              {category}
            </h3>
            <div className="space-y-0.5">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => onSelectTemplate(template)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 flex items-center gap-3 group
                    ${selectedTemplateId === template.id 
                      ? 'bg-white text-stone-900 shadow-sm ring-1 ring-stone-200/50' 
                      : 'hover:bg-stone-200/50 text-stone-600'
                    }`}
                >
                  {selectedTemplateId === template.id && (
                     <div className="w-1 h-4 bg-stone-800 rounded-full absolute left-1"></div>
                  )}
                  <span className="truncate">{template.name}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-stone-200">
        <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-stone-200 to-stone-300"></div>
            <div className="flex flex-col">
                <span className="text-xs font-medium text-stone-900">Free Plan</span>
                <span className="text-[10px] text-stone-500">FounderForms AI</span>
            </div>
        </div>
      </div>
    </div>
  );
};