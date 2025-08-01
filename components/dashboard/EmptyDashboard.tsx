import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Globe, Video, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotebooks } from '@/hooks/useNotebooks';

const EmptyDashboard = () => {
  const navigate = useNavigate();
  const {
    createNotebook,
    isCreating
  } = useNotebooks();
  
  const handleCreateNotebook = () => {
    console.log('Botón de crear cuaderno presionado');
    console.log('isCreating:', isCreating);
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
  
  return (
    <div className="text-center py-16">
      <div className="mb-12">
        <h2 className="text-3xl font-medium text-gray-900 mb-4">Crea tu primer cuaderno</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">HorusLM es un asistente de investigación y escritura con IA que funciona mejor con las fuentes que subas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">PDFs</h3>
          <p className="text-gray-600">Sube artículos de investigación, informes y documentos</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <Globe className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Sitios web</h3>
          <p className="text-gray-600">Añade páginas web y artículos online como fuentes</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <Video className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Audio</h3>
          <p className="text-gray-600">Incluye contenido multimedia en tu investigación</p>
        </div>
      </div>

      <Button onClick={handleCreateNotebook} size="lg" className="bg-blue-600 hover:bg-blue-700" disabled={isCreating}>
        <Upload className="h-5 w-5 mr-2" />
        {isCreating ? 'Creando...' : 'Crear cuaderno'}
      </Button>
    </div>
  );
};

export default EmptyDashboard;