import type { PointerEvent } from "react";

import profilePhoto from "../assets/retro/profile-photo.png";
import { folderContent } from "../data/folderContent";
import type { FolderId, FolderItem, PortfolioWindow } from "../types/portfolio";

type FinderWindowProps = {
  windowItem: PortfolioWindow;
  folders: FolderItem[];
  folderIconSrc: string;
  isActive: boolean;
  isClosing: boolean;
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
  isActive,
  isClosing,
  onOpenFolder,
  onClose,
  onFocus,
  onStartDrag,
  onStartResize,
}: FinderWindowProps) {
  const selectedContent = windowItem.folderId
    ? folderContent[windowItem.folderId]
    : null;

  const isFolderWindow =
    windowItem.type === "folder" && selectedContent !== null;

  async function handleDownload(url: string, fileName: string) {
    const response = await fetch(url);

    if (!response.ok) {
      console.error("No se pudo descargar el archivo");
      return;
    }

    const blob = await response.blob();
    const objectUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(objectUrl);
  }

  function renderLinks() {
    if (!selectedContent?.links?.length) {
      return null;
    }

    return (
      <div className="folder-detail-links">
        {selectedContent.links.map((link) =>
          link.download ? (
            <button
              key={link.url}
              type="button"
              className="folder-detail-link"
              onClick={() => handleDownload(link.url, link.download!)}
            >
              {link.label}
            </button>
          ) : (
            <a
              key={link.url}
              className="folder-detail-link"
              href={link.url}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ),
        )}
      </div>
    );
  }

  function renderItems() {
    if (!selectedContent?.items.length) {
      return null;
    }

    return (
      <div className="folder-detail-list">
        {selectedContent.items.map((item) => (
          <div key={item} className="folder-detail-item">
            {item}
          </div>
        ))}
      </div>
    );
  }

  function renderProjects() {
    if (!selectedContent?.projects?.length) {
      return null;
    }

    return (
      <div className="project-cards">
        {selectedContent.projects.map((project) => (
          <article key={project.url} className="project-card">
            <h2>{project.title}</h2>

            <p>{project.description}</p>

            <div className="project-techs">
              {project.technologies.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>

            <p className="project-role">{project.role}</p>

            <a
              className="folder-detail-link"
              href={project.url}
              target="_blank"
              rel="noreferrer"
            >
              {project.actionLabel}
            </a>
          </article>
        ))}
      </div>
    );
  }

  function renderContactContent() {
    if (!selectedContent) {
      return null;
    }

    const [emailItem, ...pendingItems] = selectedContent.items;

    return (
      <>
        <p className="folder-detail-description">
          {selectedContent.description}
        </p>

        {emailItem && (
          <div className="folder-detail-list">
            <div className="folder-detail-item">{emailItem}</div>
          </div>
        )}

        {renderLinks()}

        {pendingItems.length > 0 && (
          <div className="folder-detail-list">
            {pendingItems.map((item) => (
              <div key={item} className="folder-detail-item">
                {item}
              </div>
            ))}
          </div>
        )}
      </>
    );
  }

  return (
    <section
      className={`finder-window ${
        isActive ? "finder-window-active" : "finder-window-inactive"
      } ${isClosing ? "finder-window-closing" : ""}`}
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

                    {renderItems()}
                    {renderLinks()}
                  </div>

                  <div className="profile-photo-placeholder">
                    <img
                      className="profile-photo"
                      src={profilePhoto}
                      alt="Foto de perfil"
                      draggable={false}
                    />
                  </div>
                </div>
              ) : windowItem.folderId === "projects" ? (
                <>
                  <p className="folder-detail-description">
                    {selectedContent.description}
                  </p>

                  {renderProjects()}
                </>
              ) : windowItem.folderId === "contact" ? (
                renderContactContent()
              ) : (
                <>
                  <p className="folder-detail-description">
                    {selectedContent.description}
                  </p>

                  {renderItems()}
                  {renderLinks()}
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