import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useNotebookDelete } from '@/hooks/useNotebookDelete';

interface NotebookCardProps {
  notebook: {
    id: string;
    title: string;
    date: string;
    sources: number;
    icon: string;
    color: string;
    hasCollaborators?: boolean;
  };
}

const NotebookCard = ({
  notebook
}: NotebookCardProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const {
    deleteNotebook,
    isDeleting
  } = useNotebookDelete();

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Botón de eliminar presionado para cuaderno:', notebook.id);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Confirmando eliminación para cuaderno:', notebook.id);
    deleteNotebook(notebook.id);
    setShowDeleteDialog(false);
  };

  // Generar clases CSS a partir del nombre del color
  const colorName = notebook.color || 'gray';
  const backgroundClass = `bg-${colorName}-100`;
  const borderClass = `border-${colorName}-200`;

  return (
    <div 
      className={`rounded-lg border ${borderClass} ${backgroundClass} p-4 hover:shadow-md transition-shadow cursor-pointer relative h-48 flex flex-col`}
    >
      <div className="absolute top-3 right-3" data-delete-action="true">
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogTrigger asChild>
            <button onClick={handleDeleteClick} className="p-1 hover:bg-red-50 rounded text-gray-400 hover:text-red-500 transition-colors delete-button" disabled={isDeleting} data-delete-action="true">
              <Trash2 className="h-4 w-4" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Eliminar este cuaderno?</AlertDialogTitle>
              <AlertDialogDescription>
                Estás a punto de eliminar este cuaderno y todo su contenido. Esta acción no se puede deshacer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmDelete} className="bg-blue-600 hover:bg-blue-700" disabled={isDeleting}>
                {isDeleting ? 'Eliminando...' : 'Eliminar'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      
      <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
        <span className="text-3xl">{notebook.icon}</span>
      </div>
      
      <h3 className="text-gray-900 mb-2 pr-6 line-clamp-2 text-2xl font-normal flex-grow">
        {notebook.title}
      </h3>
      
      <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
        <span>{notebook.date} • {notebook.sources} fuente{notebook.sources !== 1 ? 's' : ''}</span>
      </div>
    </div>
  );
};

export default NotebookCard;