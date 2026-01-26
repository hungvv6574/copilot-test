/**
 * ConflictResolution Skill
 * Handles complex conflicts and edge cases
 */

import { Fix } from '../../shared/types'

export class ConflictResolutionSkill {
  /**
   * Resolve conflicts between fixes
   */
  public async resolveConflicts(fixes: Fix[]): Promise<Fix[]> {
    const additionalFixes: Fix[] = []

    // Check for conflicts and create resolution fixes if needed
    for (let i = 0; i < fixes.length; i++) {
      for (let j = i + 1; j < fixes.length; j++) {
        const fix1 = fixes[i]
        const fix2 = fixes[j]

        // Check if fixes affect the same location
        if (
          fix1.filePath === fix2.filePath &&
          fix1.lineNumber === fix2.lineNumber
        ) {
          // Create a resolution fix
          const resolutionFix: Fix = {
            id: `conflict-resolution-${Date.now()}`,
            findingId: 'conflict',
            severity: 'high',
            type: 'conflict',
            filePath: fix1.filePath,
            lineNumber: fix1.lineNumber,
            changeType: 'modify',
            original: `${fix1.original} + ${fix2.original}`,
            updated: `// Merged fixes: ${fix1.description} and ${fix2.description}`,
            description: `Resolved conflict between ${fix1.validator} and ${fix2.validator}`,
            status: 'applied',
            validator: 'ConflictResolutionSkill',
            timestamp: new Date(),
            riskLevel: 'high',
            requiresApproval: true,
          }

          additionalFixes.push(resolutionFix)
        }
      }
    }

    return additionalFixes
  }
}
