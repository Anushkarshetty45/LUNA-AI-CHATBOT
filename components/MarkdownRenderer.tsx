'use client'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const renderContent = () => {
    const lines = content.split('\n')
    const elements: JSX.Element[] = []
    let tableRows: string[][] = []
    let isInTable = false
    let listItems: string[] = []
    let isInList = false

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-1 my-2">
            {listItems.map((item, i) => (
              <li key={i} className="ml-2" dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            ))}
          </ul>
        )
        listItems = []
      }
    }

    const flushTable = () => {
      if (tableRows.length > 0) {
        const headers = tableRows[0]
        const rows = tableRows.slice(2) // Skip header and separator
        
        elements.push(
          <div key={`table-${elements.length}`} className="overflow-x-auto my-3">
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  {headers.map((header, i) => (
                    <th key={i} className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold">
                      {header.trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    {row.map((cell, j) => (
                      <td key={j} className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        {cell.trim()}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
        tableRows = []
      }
    }

    const formatInline = (text: string) => {
      // Bold
      text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // Code
      text = text.replace(/`(.+?)`/g, '<code class="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">$1</code>')
      return text
    }

    lines.forEach((line, index) => {
      // Check if line is a table row
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        if (!isInTable) {
          flushList()
          isInTable = true
        }
        const cells = line.split('|').slice(1, -1)
        tableRows.push(cells)
        return
      } else if (isInTable) {
        flushTable()
        isInTable = false
      }

      // Check if line is a list item
      if (line.trim().match(/^[-*]\s+(.+)/)) {
        if (!isInList) {
          isInList = true
        }
        const match = line.trim().match(/^[-*]\s+(.+)/)
        if (match) {
          listItems.push(match[1])
        }
        return
      } else if (isInList) {
        flushList()
        isInList = false
      }

      // Headings
      if (line.startsWith('##')) {
        elements.push(
          <h2 key={index} className="text-lg font-semibold mt-4 mb-2">
            {line.replace(/^##\s*/, '')}
          </h2>
        )
      }
      // Numbered lists
      else if (line.trim().match(/^\d+\.\s+(.+)/)) {
        const match = line.trim().match(/^\d+\.\s+(.+)/)
        if (match) {
          elements.push(
            <div key={index} className="ml-4 my-1" dangerouslySetInnerHTML={{ __html: formatInline(match[1]) }} />
          )
        }
      }
      // Regular text
      else if (line.trim()) {
        elements.push(
          <p key={index} className="my-1" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
        )
      }
      // Empty line
      else {
        elements.push(<div key={index} className="h-2" />)
      }
    })

    // Flush any remaining list or table
    flushList()
    flushTable()

    return elements
  }

  return <div className="space-y-1">{renderContent()}</div>
}

