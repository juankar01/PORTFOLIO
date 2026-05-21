import { useEffect, useState } from "react";
import type { PointerEvent } from "react";

import DesktopIcon from "./components/DesktopIcon";
import FinderWindow from "./components/FinderWindow";
import { folderContent } from "./data/folderContent";
import { portfolioFolders } from "./data/folders";
import type { FolderId, PortfolioWindow } from "./types/portfolio";

import navbarLogo from "./assets/retro/apple-logo.png";
import portfolioFolderIcon from "./assets/retro/portfolio-folder.png";
import folderIcon from "./assets/retro/folder.png";
import trashIcon from "./assets/retro/trash.png";

import "./index.css";

const WINDOWS_STORAGE_KEY = "retro-portfolio-open-windows";

type DragState = {
  windowId: string;
  startPointerX: number;
  startPointerY: number;
  startWindowX: number;
  startWindowY: number;
};

function getStoredWindows(): PortfolioWindow[] {
  const storedWindows = localStorage.getItem(WINDOWS_STORAGE_KEY);

  if (!storedWindows) {
    return [];
  }

  try {
    const parsedWindows = JSON.parse(storedWindows);

    if (!Array.isArray(parsedWindows)) {
      return [];
    }

    return parsedWindows;
  } catch {
    return [];
  }
}

function getNextZIndex(windows: PortfolioWindow[]) {
  if (windows.length === 0) {
    return 10;
  }

  return Math.max(...windows.map((windowItem) => windowItem.zIndex)) + 1;
}

function getWindowPosition(windows: PortfolioWindow[]) {
  const offset = windows.length * 28;

  return {
    x: 70 + offset,
    y: 90 + offset,
  };
}

export default function App() {
  const [openWindows, setOpenWindows] =
    useState<PortfolioWindow[]>(getStoredWindows);

  const [dragState, setDragState] = useState<DragState | null>(null);

  useEffect(() => {
    localStorage.setItem(WINDOWS_STORAGE_KEY, JSON.stringify(openWindows));
  }, [openWindows]);

  useEffect(() => {
    if (!dragState) {
      return;
    }

    const currentDrag = dragState;

    function handlePointerMove(event: globalThis.PointerEvent) {
      const deltaX = event.clientX - currentDrag.startPointerX;
      const deltaY = event.clientY - currentDrag.startPointerY;

      setOpenWindows((currentWindows) =>
        currentWindows.map((windowItem) =>
          windowItem.id === currentDrag.windowId
            ? {
                ...windowItem,
                x: currentDrag.startWindowX + deltaX,
                y: currentDrag.startWindowY + deltaY,
              }
            : windowItem,
        ),
      );
    }

    function handlePointerUp() {
      setDragState(null);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [dragState]);

  function bringWindowToFront(windowId: string) {
    setOpenWindows((currentWindows) => {
      const nextZIndex = getNextZIndex(currentWindows);

      return currentWindows.map((windowItem) =>
        windowItem.id === windowId
          ? { ...windowItem, zIndex: nextZIndex }
          : windowItem,
      );
    });
  }

  function startWindowDrag(
    windowId: string,
    event: PointerEvent<HTMLElement>,
  ) {
    const selectedWindow = openWindows.find(
      (windowItem) => windowItem.id === windowId,
    );

    if (!selectedWindow) {
      return;
    }

    bringWindowToFront(windowId);

    setDragState({
      windowId,
      startPointerX: event.clientX,
      startPointerY: event.clientY,
      startWindowX: selectedWindow.x,
      startWindowY: selectedWindow.y,
    });
  }

  function openFinderWindow() {
    setOpenWindows((currentWindows) => {
      const existingFinder = currentWindows.find(
        (windowItem) => windowItem.id === "portfolio-finder",
      );

      const nextZIndex = getNextZIndex(currentWindows);

      if (existingFinder) {
        return currentWindows.map((windowItem) =>
          windowItem.id === "portfolio-finder"
            ? { ...windowItem, zIndex: nextZIndex }
            : windowItem,
        );
      }

      const position = getWindowPosition(currentWindows);

      return [
        ...currentWindows,
        {
          id: "portfolio-finder",
          type: "finder",
          title: "Portfolio Finder",
          zIndex: nextZIndex,
          x: position.x,
          y: position.y,
        },
      ];
    });
  }

  function openFolderWindow(folderId: FolderId) {
    setOpenWindows((currentWindows) => {
      const windowId = `folder-${folderId}`;
      const nextZIndex = getNextZIndex(currentWindows);

      const existingWindow = currentWindows.find(
        (windowItem) => windowItem.id === windowId,
      );

      if (existingWindow) {
        return currentWindows.map((windowItem) =>
          windowItem.id === windowId
            ? { ...windowItem, zIndex: nextZIndex }
            : windowItem,
        );
      }

      const position = getWindowPosition(currentWindows);
      const content = folderContent[folderId];

      return [
        ...currentWindows,
        {
          id: windowId,
          type: "folder",
          title: content.title,
          folderId,
          zIndex: nextZIndex,
          x: position.x,
          y: position.y,
        },
      ];
    });
  }

  function closeWindow(windowId: string) {
    setOpenWindows((currentWindows) =>
      currentWindows.filter((windowItem) => windowItem.id !== windowId),
    );
  }

  return (
    <main className="desktop">
      <header className="menu-bar">
        <div className="menu-left">
          <img
            className="navbar-logo"
            src={navbarLogo}
            alt="Portfolio logo"
            draggable={false}
          />

          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Special</span>
        </div>
      </header>

      <section className="desktop-area">
        <div className="desktop-icons">
          <DesktopIcon
            label="Portfolio Finder"
            iconSrc={portfolioFolderIcon}
            onDoubleClick={openFinderWindow}
          />

          <DesktopIcon label="Trash" iconSrc={trashIcon} />
        </div>

        {openWindows.map((windowItem) => (
          <FinderWindow
            key={windowItem.id}
            windowItem={windowItem}
            folders={portfolioFolders}
            folderIconSrc={folderIcon}
            onOpenFolder={openFolderWindow}
            onClose={() => closeWindow(windowItem.id)}
            onFocus={() => bringWindowToFront(windowItem.id)}
            onStartDrag={(event) => startWindowDrag(windowItem.id, event)}
          />
        ))}
      </section>
    </main>
  );
}