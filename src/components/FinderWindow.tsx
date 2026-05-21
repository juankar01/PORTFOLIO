import type { PointerEvent } from "react";

import { folderContent } from "../data/folderContent";
import type { FolderId, FolderItem, PortfolioWindow } from "../types/portfolio";

type FinderWindowProps = {
  windowItem: PortfolioWindow;
  folders: FolderItem[];
  folderIconSrc: string;
  onOpenFolder: (folderId: FolderId) => void;
  onClose: () => void;
  onFocus: () => void;
  onStartDrag: (event: PointerEvent<HTMLElement>) => void;
  onStartResize: (event: PointerEvent<HTMLElement>) => void;
};

export default function FinderWindow({
  windowItem,
  folders,
  folderIconSrc,
  onOpenFolder,
  onClose,
  onFocus,
  onStartDrag,
  onStartResize,
}: FinderWindowProps) {
  const selectedContent = windowItem.folderId
    ? folderContent[windowItem.folderId]
    : null;

  const isFolderWindow = windowItem.type === "folder" && selectedContent !== null;

  return (
    <section
      className="finder-window"
      onMouseDown={onFocus}
      style={{
        left: `${windowItem.x}px`,
        top: `${windowItem.y}px`,
        zIndex: windowItem.zIndex,
        width: `${windowItem.width}px`,
        height: `${windowItem.height}px`,
      }}
    >
      <header
        className={`window-header ${
          isFolderWindow ? "window-header-detail" : "window-header-finder"
        }`}
        onPointerDown={onStartDrag}
      >
        {isFolderWindow && (
          <button
            className="window-control window-back"
            onClick={onClose}
            onPointerDown={(event) => event.stopPropagation()}
            aria-label="Volver atrás"
          />
        )}

        {isFolderWindow && <div className="window-stripes" />}

        <h1 className="window-title">{windowItem.title}</h1>

        {isFolderWindow ? (
          <button
            className="window-control window-close"
            onClick={onClose}
            onPointerDown={(event) => event.stopPropagation()}
            aria-label="Cerrar ventana"
          />
        ) : (
          <button
            className="window-control window-minimize"
            onClick={onClose}
            onPointerDown={(event) => event.stopPropagation()}
            aria-label="Minimizar carpeta"
          />
        )}
      </header>

      {!isFolderWindow && (
        <div className="window-info">
          <span>{folders.length} items</span>
          <span>Portfolio Disk</span>
          <span>Available</span>
        </div>
      )}

      {isFolderWindow && selectedContent ? (
        <div className="folder-detail">
          <div className="scrapbook-frame">
            <div className="scrapbook-page">
              {windowItem.folderId === "profile" ? (
                <div className="profile-layout">
                  <div className="profile-info">
                    <p className="folder-detail-description">
                      {selectedContent.description}
                    </p>

                    <div className="folder-detail-list">
                      {selectedContent.items.map((item) => (
                        <div key={item} className="folder-detail-item">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="profile-photo-placeholder">
                    <span>Foto</span>
                  </div>
                </div>
              ) : (
                <>
                  <p className="folder-detail-description">
                    {selectedContent.description}
                  </p>

                  <div className="folder-detail-list">
                    {selectedContent.items.map((item) => (
                      <div key={item} className="folder-detail-item">
                        {item}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="window-content">
          {folders.map((folder) => (
            <button
              key={folder.id}
              className="finder-folder"
              onDoubleClick={() => onOpenFolder(folder.id)}
            >
              <span className="finder-folder-icon-frame">
                <img
                  className="finder-folder-image"
                  src={folderIconSrc}
                  alt={folder.title}
                  draggable={false}
                />
              </span>

              <span className="finder-folder-title">{folder.title}</span>
              <small>{folder.items} items</small>
            </button>
          ))}
        </div>
      )}

      <button
        className="window-resize-handle"
        onPointerDown={onStartResize}
        aria-label="Redimensionar ventana"
      />
    </section>
  );
}