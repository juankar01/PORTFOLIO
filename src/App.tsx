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

const DEFAULT_WINDOW_WIDTH = 900;
const DEFAULT_WINDOW_HEIGHT = 500;
const MIN_WINDOW_WIDTH = 420;
const MIN_WINDOW_HEIGHT = 300;

type DragState = {
  windowId: string;
  startPointerX: number;
  startPointerY: number;
  startWindowX: number;
  startWindowY: number;
};

type ResizeState = {
  windowId: string;
  startPointerX: number;
  startPointerY: number;
  startWindowWidth: number;
  startWindowHeight: number;
};

function getStoredWindows(): PortfolioWindow[] {
  const storedWindows = localStorage.getItem(WINDOWS_STORAGE_KEY);

  if (!storedWindows) {
    return [];
  }

  try {
    const parsedWindows = JSON.parse(storedWindows) as PortfolioWindow[];

    if (!Array.isArray(parsedWindows)) {
      return [];
    }

    return parsedWindows.map((windowItem) => ({
      ...windowItem,
      width:
        typeof windowItem.width === "number"
          ? windowItem.width
          : DEFAULT_WINDOW_WIDTH,
      height:
        typeof windowItem.height === "number"
          ? windowItem.height
          : DEFAULT_WINDOW_HEIGHT,
    }));
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

function getDefaultWindowSize() {
  const maxWidth = Math.max(MIN_WINDOW_WIDTH, window.innerWidth - 32);
  const maxHeight = Math.max(MIN_WINDOW_HEIGHT, window.innerHeight - 70);

  return {
    width: Math.min(DEFAULT_WINDOW_WIDTH, maxWidth),
    height: Math.min(DEFAULT_WINDOW_HEIGHT, maxHeight),
  };
}

export default function App() {
  const [openWindows, setOpenWindows] =
    useState<PortfolioWindow[]>(getStoredWindows);

  const [dragState, setDragState] = useState<DragState | null>(null);
  const [resizeState, setResizeState] = useState<ResizeState | null>(null);

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

  useEffect(() => {
    if (!resizeState) {
      return;
    }

    const currentResize = resizeState;

    function handlePointerMove(event: globalThis.PointerEvent) {
      const deltaX = event.clientX - currentResize.startPointerX;
      const deltaY = event.clientY - currentResize.startPointerY;

      const maxWidth = Math.max(MIN_WINDOW_WIDTH, window.innerWidth - 32);
      const maxHeight = Math.max(MIN_WINDOW_HEIGHT, window.innerHeight - 70);

      setOpenWindows((currentWindows) =>
        currentWindows.map((windowItem) =>
          windowItem.id === currentResize.windowId
            ? {
                ...windowItem,
                width: Math.min(
                  maxWidth,
                  Math.max(
                    MIN_WINDOW_WIDTH,
                    currentResize.startWindowWidth + deltaX,
                  ),
                ),
                height: Math.min(
                  maxHeight,
                  Math.max(
                    MIN_WINDOW_HEIGHT,
                    currentResize.startWindowHeight + deltaY,
                  ),
                ),
              }
            : windowItem,
        ),
      );
    }

    function handlePointerUp() {
      setResizeState(null);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [resizeState]);

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
    event.preventDefault();

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

  function startWindowResize(
    windowId: string,
    event: PointerEvent<HTMLElement>,
  ) {
    event.preventDefault();
    event.stopPropagation();

    const selectedWindow = openWindows.find(
      (windowItem) => windowItem.id === windowId,
    );

    if (!selectedWindow) {
      return;
    }

    bringWindowToFront(windowId);

    setResizeState({
      windowId,
      startPointerX: event.clientX,
      startPointerY: event.clientY,
      startWindowWidth: selectedWindow.width,
      startWindowHeight: selectedWindow.height,
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
      const size = getDefaultWindowSize();

      return [
        ...currentWindows,
        {
          id: "portfolio-finder",
          type: "finder",
          title: "Portfolio Finder",
          zIndex: nextZIndex,
          x: position.x,
          y: position.y,
          width: size.width,
          height: size.height,
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
      const size = getDefaultWindowSize();
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
          width: size.width,
          height: size.height,
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
            onStartResize={(event) => startWindowResize(windowItem.id, event)}
          />
        ))}
      </section>
    </main>
  );
}