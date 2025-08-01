import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import NotebookCard from './NotebookCard';
import { Check, Grid3X3, List, ChevronDown } from 'lucide-react';
import { useNotebooks } from '@/hooks/useNotebooks';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const NotebookGrid = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('Más reciente');
  const {
    notebooks,
    isLoading,
    createNotebook,
    isCreating
  } = useNotebooks();
  const navigate = useNavigate();

  const sortedNotebooks = useMemo(() => {
    if (!notebooks) return [];
    
    const sorted = [...notebooks];
    
    if (sortBy === 'Más reciente') {
      return sorted.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    } else if (sortBy === 'Título') {
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    return sorted;
  }, [notebooks, sortBy]);

  const handleCreateNotebook = () => {
    createNotebook({
      title: 'Cuaderno sin título',
      description: ''
    }, {
      onSuccess: data => {
        console.log('Navegando al cuaderno:', data.id);
        navigate(`/notebook/${data.id}`);
      },
      onError: error => {
        console.error('Error al crear cuaderno:', error);
      }
    });
  };

  const handleNotebookClick = (notebookId: string, e: React.MouseEvent) => {
    // Verificar si el clic proviene de una acción de eliminación u otro elemento interactivo
    const target = e.target as HTMLElement;
    const isDeleteAction = target.closest('[data-delete-action="true"]') || target.closest('.delete-button') || target.closest('[role="dialog"]');
    if (isDeleteAction) {
      console.log('Clic evitado debido a acción de eliminación');
      return;
    }
    navigate(`/notebook/${notebookId}`);
  };

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600">Cargando cuadernos...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <Button className="bg-black hover:bg-gray-800 text-white rounded-full px-6" onClick={handleCreateNotebook} disabled={isCreating}>
          {isCreating ? 'Creando...' : '+ Crear nuevo'}
        </Button>
        
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-2 bg-white rounded-lg border px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors">
                <span className="text-sm text-gray-600">{sortBy}</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setSortBy('Más reciente')} className="flex items-center justify-between">
                Más reciente
                {sortBy === 'Más reciente' && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('Título')} className="flex items-center justify-between">
                Título
                {sortBy === 'Título' && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sortedNotebooks.map(notebook => (
          <div key={notebook.id} onClick={e => handleNotebookClick(notebook.id, e)}>
            <NotebookCard notebook={{
              id: notebook.id,
              title: notebook.title,
              date: new Date(notebook.updated_at).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              }),
              sources: notebook.sources?.[0]?.count || 0,
              icon: notebook.icon || '📝',
              color: notebook.color || 'bg-gray-100'
            }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotebookGrid;