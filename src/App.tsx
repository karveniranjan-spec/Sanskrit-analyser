import { useState } from 'react';
import './App.css'; // Just keeping standard import if needed
import type { VedicData } from './types';
import { generateMockVedicData } from './mockData';
// @ts-ignore
import html2pdf from 'html2pdf.js';

function App() {
  const [inputText, setInputText] = useState("");
  const [vedicData, setVedicData] = useState<VedicData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    // Simulate realistic API delay
    setTimeout(() => {
      const data = generateMockVedicData(inputText);
      setVedicData(data);
      setIsProcessing(false);
    }, 1500);
  };

  const downloadMarkdown = () => {
    if (!vedicData) return;

    const mdContent = `# ${vedicData.verseId}

## Verse Identification
**Reference**: ${vedicData.verseId}

## Mantra
### Devanagari (Svara/Accented)
<div align="center">
  <h2>${vedicData.mantraDevanagari}</h2>
</div>

### Transliteration
*${vedicData.mantraTransliteration}*

## Translations
### Literal Translation
${vedicData.literalTranslation}

### Philosophical Translation
${vedicData.philosophicalTranslation}

## Padapatha (Word-by-word break)
**Devanagari**: ${vedicData.padapathaDevanagari}
**Transliteration**: ${vedicData.padapathaTransliteration}

## Detailed Word Analysis
| Word | Transliteration | Meaning |
|------|-----------------|---------|
${vedicData.wordAnalysis.map(w => `| ${w.word} | ${w.transliteration} | ${w.meaning} |`).join('\n')}

## Image Generation Prompt
> ${vedicData.imagePrompt}

## NotebookLM Context Prompt
> ${vedicData.notebookLmInput}
`;

    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Vedic_Analysis_${vedicData.verseId.replace(/[^a-z0-9]/gi, '_')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadWord = () => {
    if (!vedicData) return;
    const content = document.getElementById("export-content")?.innerHTML || "";

    const htmlObj = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'><title>Vedic Analysis</title>
    <style>
      body { font-family: 'Inter', sans-serif; color: #111827; line-height: 1.6; }
      h1 { text-align: center; color: #b45309; }
      h3 { color: #b45309; margin-bottom: 5px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;}
      h4 { color: #b45309; margin-bottom: 5px; margin-top: 15px;}
      table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 20px;}
      th, td { border: 1px solid #e5e7eb; padding: 10px; text-align: left; }
      th { background-color: #f3f4f6; color: #4b5563; }
      .mantra-text { font-size: 1.5em; text-align: center; color: #111827; }
      .translit-text { font-style: italic; text-align: center; color: #4b5563; }
      .result-box { margin-bottom: 20px; }
      .vedic-font { font-family: "Martel", "Arial Unicode MS", serif; }
    </style>
    </head><body>
      <h1>${vedicData.verseId}</h1>
      ${content}
    </body></html>`;

    const blob = new Blob(['\ufeff', htmlObj], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Vedic_Analysis_${vedicData.verseId.replace(/[^a-z0-9]/gi, '_')}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPdf = () => {
    const element = document.getElementById("export-content");
    if (!element || !vedicData) return;

    // Small timeout to ensure everything is rendered perfectly before painting
    setTimeout(() => {
      const opt: any = {
        margin: 10,
        filename: `Vedic_Analysis_${vedicData.verseId.replace(/[^a-z0-9]/gi, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(element).save();
    }, 100);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Vedic Text Analyser</h1>
        <p>Unlock the profound wisdom, phonetics, and meaning of ancient scriptures</p>
      </header>

      <main className="main-content">
        <section className="panel input-section">
          <h2 style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>Input Verse or Reference</h2>
          <textarea
            placeholder="e.g. Rigveda 1.1.1 or paste the Sanskrit verse here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            className="btn-primary"
            onClick={handleAnalyze}
            disabled={isProcessing || !inputText.trim()}
          >
            {isProcessing ? 'Analyzing Core Metrics...' : 'Analyze Text ✨'}
          </button>
        </section>

        {vedicData && (
          <section className="panel result-panel">
            <div className="result-header">
              <h2>Analysis Results</h2>
              <div className="export-actions">
                <button className="btn-secondary" onClick={downloadMarkdown}>
                  MD ⬇️
                </button>
                <button className="btn-secondary" onClick={downloadWord}>
                  Word 📝
                </button>
                <button className="btn-secondary" onClick={downloadPdf}>
                  PDF 📄
                </button>
              </div>
            </div>

            <div id="export-content">
              <div className="result-section">
                <h3>Mantra (Accented)</h3>
                <div className="result-box">
                  <div className="mantra-text vedic-font">{vedicData.mantraDevanagari}</div>
                  <div className="translit-text">{vedicData.mantraTransliteration}</div>
                </div>
              </div>

              <div className="result-section">
                <h3>Translations</h3>
                <div className="result-box" style={{ marginBottom: "1rem" }}>
                  <h4 style={{ color: "var(--accent-gold)", marginBottom: "0.5rem" }}>Literal Translation</h4>
                  <p>{vedicData.literalTranslation}</p>
                </div>
                <div className="result-box">
                  <h4 style={{ color: "var(--accent-gold)", marginBottom: "0.5rem" }}>Philosophical Translation</h4>
                  <p>{vedicData.philosophicalTranslation}</p>
                </div>
              </div>

              <div className="result-section">
                <h3>Padapatha</h3>
                <div className="result-box" style={{ fontSize: "1.1rem" }}>
                  <div className="vedic-font" style={{ marginBottom: "0.5rem", color: "var(--accent-gold)" }}>{vedicData.padapathaDevanagari}</div>
                  <div style={{ color: "var(--text-secondary)" }}>{vedicData.padapathaTransliteration}</div>
                </div>
              </div>

              <div className="result-section">
                <h3>Word Analysis</h3>
                <div className="result-box" style={{ overflowX: 'auto' }}>
                  <table className="word-table">
                    <thead>
                      <tr>
                        <th>Word</th>
                        <th>Transliteration</th>
                        <th>Meaning</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vedicData.wordAnalysis.map((w, i) => (
                        <tr key={i}>
                          <td className="vedic-font">{w.word}</td>
                          <td style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>{w.transliteration}</td>
                          <td>{w.meaning}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="result-section" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 250px" }}>
                  <h3>Image Prompt</h3>
                  <div className="result-box" style={{ fontSize: "0.9rem", color: "var(--text-muted)", minHeight: "80px" }}>
                    {vedicData.imagePrompt}
                  </div>
                </div>
                <div style={{ flex: "1 1 250px" }}>
                  <h3>NotebookLM Input</h3>
                  <div className="result-box" style={{ fontSize: "0.9rem", color: "var(--text-muted)", minHeight: "80px" }}>
                    {vedicData.notebookLmInput}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
