import { useState, useContext, createContext, useEffect } from "react"

export function TabsButton({ label, tabIndex, isActive }) {
  const { activeIndex, setActiveIndex } = useTabContext()

  useEffect(() => {
    if (activeIndex == null && isActive) {
      setActiveIndex(tabIndex)
    }
  }, [activeIndex])

  return (
    <li>
      <button
        className={activeIndex == tabIndex ? "active" : ""}
        onClick={() => setActiveIndex(tabIndex)}>
        {label}
      </button>
    </li>
  )
}

export function Tab({ tabIndex, children }) {
  const { activeIndex } = useTabContext()
  return (
    <div className={activeIndex == tabIndex ? "show" : "hide"}>{children}</div>
  )
}

const TabContext = createContext(null)

export function useTabContext() {
  return useContext(TabContext)
}
export function TabContainer({ children }) {
  const [activeIndex, setActiveIndex] = useState()
  return (
    <TabContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div className="tab-container">{children}</div>
    </TabContext.Provider>
  )
}
