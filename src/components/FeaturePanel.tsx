import React from 'react';
import { SupportedLanguage, SupportedFramework } from '../types';
import { Code, Bug, Database, FileCode, Lightbulb, GitBranch, Zap, BookOpen } from 'lucide-react';

interface FeaturePanelProps {
  onSelectFeature: (feature: string) => void;
}

const FeaturePanel: React.FC<FeaturePanelProps> = ({ onSelectFeature }) => {
  const features = [
    { id: 'generate', name: 'ኮድ ይፍጠሩ', icon: <Code size={20} />, description: 'ፋንክሽኖችን፣ ሞጁሎችን ወይም አፕሊኬሽኖችን ይፍጠሩ' },
    { id: 'debug', name: 'ዲባግ እና ማሻሻል', icon: <Bug size={20} />, description: 'ስህተቶችን ይፈልጉ እና ያስተካክሉ፣ አፈጻጸምን ያሻሽሉ' },
    { id: 'explain', name: 'ኮድ ማብራሪያ', icon: <BookOpen size={20} />, description: 'ውስብስብ ኮድ እና ፅንሰ-ሀሳቦችን ይረዱ' },
    { id: 'database', name: 'የዳታቤዝ እርዳታ', icon: <Database size={20} />, description: 'ኩዌሪዎች፣ ስኪማዎች እና CRUD ኦፕሬሽኖች' },
    { id: 'api', name: 'API ይገንቡ', icon: <Zap size={20} />, description: 'RESTful ወይም GraphQL APIs ይፍጠሩ' },
    { id: 'test', name: 'ቴስቶችን ይፍጠሩ', icon: <FileCode size={20} />, description: 'የዩኒት እና የኢንተግሬሽን ቴስቶችን ይፍጠሩ' },
    { id: 'review', name: 'የኮድ ግምገማ', icon: <GitBranch size={20} />, description: 'ግብረመልስ እና የማሻሻያ ሀሳቦችን ያግኙ' },
    { id: 'learn', name: 'ፅንሰ-ሀሳቦችን ይማሩ', icon: <Lightbulb size={20} />, description: 'ትምህርቶች እና ማብራሪያዎች' },
  ];

  const languages: SupportedLanguage[] = [
    'javascript', 'typescript', 'python', 'java', 'c', 'cpp', 'csharp', 'go', 'ruby', 'php', 'swift', 'kotlin', 'rust'
  ];

  const frameworks: SupportedFramework[] = [
    'react', 'vue', 'angular', 'svelte', 'express', 'django', 'flask', 'spring', 'laravel', 'rails'
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-yellow-200">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-green-800 mb-2">ኮድ አሲስት AI</h2>
        <p className="text-yellow-800">የኢትዮጵያ ዲጂታል ልማት አጋር</p>
        <div className="w-24 h-1 bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 mx-auto mt-2"></div>
      </div>
      
      <h3 className="text-xl font-bold mb-4 text-green-800">በምን ልረዳዎት?</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {features.map((feature) => (
          <button
            key={feature.id}
            onClick={() => onSelectFeature(feature.id)}
            className="flex flex-col items-center text-center p-4 border border-yellow-200 rounded-lg hover:bg-green-50 hover:border-green-200 transition-colors"
          >
            <div className="text-green-600 mb-2">{feature.icon}</div>
            <h3 className="font-medium mb-1">{feature.name}</h3>
            <p className="text-xs text-yellow-800">{feature.description}</p>
          </button>
        ))}
      </div>
      
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2 text-green-800">ቋንቋዎች</h3>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => onSelectFeature(`language:${lang}`)}
              className="px-3 py-1 text-xs rounded-full bg-yellow-100 hover:bg-yellow-200 transition-colors text-yellow-800"
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-2 text-green-800">ፍሬምወርኮች እና ላይብረሪዎች</h3>
        <div className="flex flex-wrap gap-2">
          {frameworks.map((framework) => (
            <button
              key={framework}
              onClick={() => onSelectFeature(`framework:${framework}`)}
              className="px-3 py-1 text-xs rounded-full bg-yellow-100 hover:bg-yellow-200 transition-colors text-yellow-800"
            >
              {framework}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-yellow-800 italic">
        "ዕውቀት ከወርቅ ይበልጣል" - የኢትዮጵያ ምሳሌ
      </div>
    </div>
  );
};

export default FeaturePanel;