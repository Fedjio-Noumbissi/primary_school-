import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface PageTemplateProps {
  title: string;
  subtitle?: string;
  badge?: string;
  icon?: ReactNode;
  headerActions?: ReactNode;
  children: ReactNode;
}

export const PageTemplate = ({
  title,
  subtitle,
  badge,
  icon,
  headerActions,
  children
}: PageTemplateProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

        .pt-layout {
          padding: 28px 32px 48px;
          min-height: calc(100vh - 64px); /* assuming some header height if needed, otherwise min-height fits nicely */
          font-family: 'Sora', sans-serif;
          background: transparent; /* Background is handled by BaseLayout */
        }

        .pt-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 28px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .pt-title-group {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .pt-icon-wrap {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #059669;
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.08), 0 1px 3px rgba(0,0,0,0.04);
          border: 1px solid rgba(5, 150, 105, 0.1);
        }
        
        .pt-icon-wrap svg {
          width: 20px;
          height: 20px;
        }

        .pt-title {
          font-size: 24px;
          font-weight: 700;
          color: #0d1117;
          letter-spacing: -0.6px;
          line-height: 1.2;
        }

        .pt-subtitle {
          font-size: 13px;
          color: #6b7280;
          margin-top: 4px;
        }

        .pt-badge {
          display: inline-flex;
          align-items: center;
          font-size: 11.5px;
          font-weight: 600;
          background: linear-gradient(135deg, #059669, #047857);
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          letter-spacing: 0.1px;
          box-shadow: 0 2px 8px rgba(5,150,105,0.25);
          margin-left: 12px;
          vertical-align: middle;
        }

        .pt-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        /* Beautiful button style */
        .pt-btn-primary {
          background: linear-gradient(135deg, #059669, #047857);
          color: white;
          font-size: 13.5px;
          font-weight: 600;
          padding: 10px 18px;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: none;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(5,150,105,0.25);
          transition: all 0.2s ease;
        }
        .pt-btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(5,150,105,0.35);
        }
        .pt-btn-primary svg {
          width: 16px;
          height: 16px;
        }

        .pt-card {
          background: white;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.03);
          overflow: hidden;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.4s ease, transform 0.4s ease, box-shadow 0.2s;
        }
        
        .pt-card.mounted {
          opacity: 1;
          transform: translateY(0);
        }

        /* Global toolbars */
        .pt-toolbar {
          padding: 16px 20px;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #fafafa;
        }

        .pt-search-input {
          width: 260px;
          padding: 9px 16px 9px 38px;
          font-size: 13px;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 8px;
          background: white;
          color: #111827;
          font-family: inherit;
          transition: all 0.2s ease;
          outline: none;
        }
        .pt-search-input:focus {
          border-color: #34d399;
          box-shadow: 0 0 0 3px rgba(52,211,153,0.15);
        }
        .pt-search-wrap {
          position: relative;
          display: inline-block;
        }
        .pt-search-wrap svg {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 15px;
          height: 15px;
          color: #9ca3af;
        }

        /* Generic premium table styles */
        .pt-table-wrap {
          width: 100%;
          overflow-x: auto;
        }

        table.pt-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 13.5px;
        }

        table.pt-table th {
          font-size: 11.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #6b7280;
          padding: 16px 20px;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          background: #f9fafb;
          white-space: nowrap;
        }

        table.pt-table td {
          padding: 16px 20px;
          border-bottom: 1px solid rgba(0,0,0,0.03);
          color: #111827;
          vertical-align: middle;
        }

        table.pt-table tr:last-child td {
          border-bottom: none;
        }

        table.pt-table tr:hover td {
          background: #fdfdfd;
        }

        .pt-badge-green { background: #ecfdf5; color: #059669; font-weight: 600; font-size: 11.5px; padding: 4px 10px; border-radius: 20px; display: inline-block; }
        .pt-badge-red { background: #fff1f2; color: #e11d48; font-weight: 600; font-size: 11.5px; padding: 4px 10px; border-radius: 20px; display: inline-block; }
        .pt-badge-blue { background: #eff6ff; color: #3b82f6; font-weight: 600; font-size: 11.5px; padding: 4px 10px; border-radius: 20px; display: inline-block; }
        .pt-badge-orange { background: #fff7ed; color: #f97316; font-weight: 600; font-size: 11.5px; padding: 4px 10px; border-radius: 20px; display: inline-block; }
        .pt-badge-purple { background: #f5f3ff; color: #7c3aed; font-weight: 600; font-size: 11.5px; padding: 4px 10px; border-radius: 20px; display: inline-block; }

        .pt-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 20px;
          text-align: center;
        }

        .pt-empty-icon {
          width: 64px;
          height: 64px;
          border-radius: 20px;
          background: #ecfdf5;
          color: #059669;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          box-shadow: 0 8px 24px rgba(5,150,105,0.12);
        }
        
        .pt-empty-icon svg {
          width: 28px;
          height: 28px;
        }

        .pt-empty-title {
          font-size: 17.5px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 8px;
        }

        .pt-empty-desc {
          font-size: 13.5px;
          color: #6b7280;
          max-width: 320px;
          line-height: 1.5;
        }
      `}</style>

      <div className="pt-layout">
        <div className="pt-header">
          <div className="pt-title-group">
            {icon && <div className="pt-icon-wrap">{icon}</div>}
            <div>
              <div className="pt-title">
                {title}
                {badge && <span className="pt-badge">{badge}</span>}
              </div>
              {subtitle && <div className="pt-subtitle">{subtitle}</div>}
            </div>
          </div>

          <div className="pt-actions">
            {headerActions}
          </div>
        </div>

        <div className={`pt-card ${mounted ? 'mounted' : ''}`}>
          {children}
        </div>
      </div>
    </>
  );
};
