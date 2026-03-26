export const parseTestFile = (rawText) => {
    const cleanText = rawText.replace(/\\s*/g, '');
    const questionBlocks = cleanText.split(/(?=^\d+\.\s+)/m).filter(Boolean);
    
    return questionBlocks.map(block => {
        const lines = block.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        const optionsLines = lines.slice(-4);
        const questionLines = lines.slice(0, -4);
        const questionText = questionLines.join(' ').replace(/^\d+\.\s*/, '');
        
        const options = [];
        let correctIndex = 0;
        
        optionsLines.forEach((opt, index) => {
            if (opt.startsWith('{') && opt.endsWith('}')) {
                correctIndex = index;
                opt = opt.slice(1, -1).trim();
            }
            options.push(opt);
        });
        
        return {
            question: questionText,
            options: options,
            correctIndex: correctIndex
        };
    });
};