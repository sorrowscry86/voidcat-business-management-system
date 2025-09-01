#!/usr/bin/env node

// Simple test script for VoidCat Thinking Tools API
const path = require('path');
const { execSync } = require('child_process');

// Use tsx to run TypeScript directly
const testScript = `
import { VoidCatThinkingToolsService } from './src/services/thinking-tools';

async function testThinkingTools() {
  console.log('🧠 Testing VoidCat Thinking Tools Service...\\n');
  
  const service = new VoidCatThinkingToolsService();
  
  // Test context
  const context = {
    type: 'outline' as const,
    context: 'Test outline generation',
    domain: 'document' as const,
    spiritualAlignment: 'beatrice-wisdom' as const,
    userId: 'test-user',
    userType: 'human' as const
  };

  try {
    // Test 1: Outline Generation
    console.log('📋 Testing Outline Generation...');
    const outlineResult = await service.generateOutline(
      { topic: 'VoidCat BMS API Documentation', depth: 3, format: 'hierarchical' },
      context
    );
    console.log('✅ Outline Generation:', outlineResult.success ? 'PASSED' : 'FAILED');
    if (outlineResult.success) {
      console.log(\`   - Generated outline with \${outlineResult.result.sections.length} sections\`);
      console.log(\`   - Mystical Blessing: \${outlineResult.result.metadata.mysticalBlessing}\`);
    }
    console.log();

    // Test 2: Checklist Generation  
    console.log('✅ Testing Checklist Generation...');
    const checklistContext = { ...context, type: 'checklist' as const };
    const checklistResult = await service.generateChecklist(
      { task: 'Create API documentation', context: 'Technical documentation', priority: 'high' },
      checklistContext
    );
    console.log('✅ Checklist Generation:', checklistResult.success ? 'PASSED' : 'FAILED');
    if (checklistResult.success) {
      console.log(\`   - Generated checklist with \${checklistResult.result.categories.length} categories\`);
      const totalItems = checklistResult.result.categories.reduce((sum: number, cat: any) => sum + cat.items.length, 0);
      console.log(\`   - Total items: \${totalItems}\`);
    }
    console.log();

    // Test 3: Content Refinement
    console.log('🔧 Testing Content Refinement...');
    const refineContext = { ...context, type: 'refine' as const };
    const refineResult = await service.refineContent(
      { 
        content: 'VoidCat BMS is a platform. It has features. Users can use it.',
        refinementType: 'completeness',
        targetAudience: 'developers'
      },
      refineContext
    );
    console.log('✅ Content Refinement:', refineResult.success ? 'PASSED' : 'FAILED');
    if (refineResult.success) {
      console.log(\`   - Original length: \${refineResult.result.originalLength} characters\`);
      console.log(\`   - Refinement type: \${refineResult.result.refinementType}\`);
    }
    console.log();

    // Summary
    const passedTests = [outlineResult, checklistResult, refineResult].filter(result => result.success).length;
    const totalTests = 3;

    console.log('🎯 Test Summary:');
    console.log(\`   - Passed: \${passedTests}/\${totalTests}\`);
    console.log(\`   - Success Rate: \${((passedTests / totalTests) * 100).toFixed(1)}%\`);
    
    if (passedTests === totalTests) {
      console.log('🎉 Core thinking tools tests passed! VoidCat Thinking Tools are ready! ✨');
    } else {
      console.log('⚠️  Some tests failed. Check implementation.');
    }

  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
}

// Run tests
testThinkingTools().catch(console.error);
`;

// Write temp file and run
require('fs').writeFileSync('temp-test.ts', testScript);
try {
  execSync('npx tsx temp-test.ts', { stdio: 'inherit' });
} finally {
  try { require('fs').unlinkSync('temp-test.ts'); } catch {}
}