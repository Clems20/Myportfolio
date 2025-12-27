import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { WorkGrid, projects } from "./components/WorkGrid";
import { DesignProcess } from "./components/DesignProcess";
import { Tools } from "./components/Tools";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ProjectDetail } from "./components/ProjectDetail";
import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";

export default function App() {
  const [currentProjectId, setCurrentProjectId] = useState<number | null>(null);
  
  // Handle hash changes for direct linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const match = hash.match(/#project-(\d+)/);
      if (match) {
        setCurrentProjectId(parseInt(match[1]));
      } else {
        setCurrentProjectId(null);
      }
    };
    
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  const currentProject = currentProjectId ? projects.find(p => p.id === currentProjectId) : null;
  
  const handleProjectClick = (projectId: number) => {
    setCurrentProjectId(projectId);
    window.history.pushState(null, '', `#project-${projectId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleCloseProject = () => {
    setCurrentProjectId(null);
    window.history.pushState(null, '', '#');
  };
  
  const handleNavigateProject = (direction: 'prev' | 'next') => {
    if (!currentProjectId) return;
    
    const currentIndex = projects.findIndex(p => p.id === currentProjectId);
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + projects.length) % projects.length
      : (currentIndex + 1) % projects.length;
    
    const newProjectId = projects[newIndex].id;
    setCurrentProjectId(newProjectId);
    window.history.pushState(null, '', `#project-${newProjectId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {currentProject ? (
          <ProjectDetail
            key={currentProject.id}
            project={currentProject}
            onClose={handleCloseProject}
            onNavigate={handleNavigateProject}
            hasPrev={true}
            hasNext={true}
          />
        ) : (
          <>
            <Header />
            <main>
              <Hero />
              <WorkGrid onProjectClick={handleProjectClick} />
              <DesignProcess />
              <Tools />
              <About />
              <Contact />
            </main>
            <Footer />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}