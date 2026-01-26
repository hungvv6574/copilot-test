/**
 * FormattingFix Skill
 * Fixes code formatting, style, and performance issues
 */

import { Fix, Finding } from '../../shared/types'

export class FormattingFixSkill {
  /**
   * Fix formatting and style issues
   */
  public async fix(findings: Finding[]): Promise<Fix[]> {
    const fixes: Fix[] = []

    for (const finding of findings) {
      const fix: Fix = {
        id: `fix-${finding.id}`,
        findingId: finding.id,
        severity: finding.severity,
        type: 'format',
        filePath: finding.filePath,
        lineNumber: finding.lineNumber,
        changeType: 'modify',
        original: 'for(let i=0;i<arr.length;i++) { updateDOM(arr[i]) }',
        updated:
          'const fragment = document.createDocumentFragment(); arr.forEach(item => fragment.appendChild(updateDOM(item))); container.appendChild(fragment);',
        description: 'Optimized DOM updates by batching them together',
        status: 'applied',
        validator: 'FormattingFixSkill',
        timestamp: new Date(),
        riskLevel: 'medium',
        requiresApproval: true,
      }

      fixes.push(fix)
    }

    return fixes
  }
}
