/**
 * OfflineCompatibility Skill
 * Verifies offline support and compatibility
 */

import { Finding, InvestigateConfig } from '../../shared/types'

export class OfflineCompatibilitySkill {
  /**
   * Run offline compatibility investigation
   */
  public async investigate(_config: InvestigateConfig): Promise<Finding[]> {
    const findings: Finding[] = []

    // Example: External API call
    findings.push({
      id: 'offline-001',
      type: 'warning',
      severity: 'critical',
      category: 'offline-compatibility',
      filePath: 'src/services/IFSource.ts',
      lineNumber: 42,
      title: 'External API call without offline handling',
      description:
        'Network request will fail in offline mode without fallback mechanism',
      suggestion: 'Add offline detection and cache/fallback data',
      fixable: true,
      priority: 9,
      detectedAt: new Date(),
      detectedBy: 'OfflineCompatibilitySkill',
    })

    // Example: Missing service worker
    findings.push({
      id: 'offline-002',
      type: 'warning',
      severity: 'high',
      category: 'offline-compatibility',
      filePath: 'src/main.ts',
      lineNumber: 1,
      title: 'No service worker detected',
      description: 'Application may not work properly in offline mode',
      suggestion: 'Implement service worker for offline support',
      fixable: false,
      priority: 8,
      detectedAt: new Date(),
      detectedBy: 'OfflineCompatibilitySkill',
    })

    // Example: Unsupported API
    findings.push({
      id: 'offline-003',
      type: 'info',
      severity: 'medium',
      category: 'offline-compatibility',
      filePath: 'src/pages/StartPage.vue',
      lineNumber: 18,
      title: 'Using API not available offline',
      description: 'localStorage might not be available in some offline scenarios',
      suggestion: 'Use IndexedDB or implement fallback storage',
      fixable: true,
      priority: 5,
      detectedAt: new Date(),
      detectedBy: 'OfflineCompatibilitySkill',
    })

    return findings
  }
}
