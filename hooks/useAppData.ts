import { useState, useEffect, useCallback } from 'react';
import { ApiService } from '@/services/api';
import type { Note } from '@/types/note';
import type { Event } from '@/types/event';
import type { DashboardStats } from '@/services/api';

// Interface pour l'état de chargement
interface LoadingState {
  notes: boolean;
  events: boolean;
  dashboard: boolean;
}

// Interface pour l'état des erreurs
interface ErrorState {
  notes: string | null;
  events: string | null;
  dashboard: string | null;
}

export const useAppData = () => {
  // États pour les données
  const [notes, setNotes] = useState<Note[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);

  // États pour le chargement et les erreurs
  const [loading, setLoading] = useState<LoadingState>({
    notes: false,
    events: false,
    dashboard: false,
  });
  const [errors, setErrors] = useState<ErrorState>({
    notes: null,
    events: null,
    dashboard: null,
  });

  // Fonction pour charger les notes
  const loadNotes = useCallback(async () => {
    setLoading(prev => ({ ...prev, notes: true }));
    setErrors(prev => ({ ...prev, notes: null }));

          try {
        const response = await ApiService.getNotes();
        // console.log('Réponse API Notes complète:', JSON.stringify(response.data, null, 2));
        if (response.error) {
          setErrors(prev => ({ ...prev, notes: response.error || null }));
        } else {
        // API Platform retourne les données dans member pour les listes
        const notesData = (response.data as any)['member'] || response.data;
        
        // Vérifier que notesData est un tableau
        if (!Array.isArray(notesData)) {
          console.error('notesData n\'est pas un tableau:', notesData);
          setNotes([]);
          return;
        }
        
        const convertedNotes = notesData.map((note: any) => ({
          ...note,
          id: note.id.toString(),
          date: new Date(note.date),
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt),
        }));
        setNotes(convertedNotes);
      }
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        notes: error instanceof Error ? error.message : 'Erreur lors du chargement des notes' 
      }));
    } finally {
      setLoading(prev => ({ ...prev, notes: false }));
    }
  }, []);

  // Fonction pour charger les événements
  const loadEvents = useCallback(async () => {
    setLoading(prev => ({ ...prev, events: true }));
    setErrors(prev => ({ ...prev, events: null }));

          try {
        const response = await ApiService.getEvents();
        // console.log('Réponse API Events complète:', JSON.stringify(response.data, null, 2));
        if (response.error) {
          setErrors(prev => ({ ...prev, events: response.error || null }));
        } else {
        // API Platform retourne les données dans member pour les listes
        const eventsData = (response.data as any)['member'] || response.data;
        
        // Vérifier que eventsData est un tableau
        if (!Array.isArray(eventsData)) {
          console.error('eventsData n\'est pas un tableau:', eventsData);
          setEvents([]);
          return;
        }
        
        const convertedEvents = eventsData.map((event: any) => ({
          ...event,
          id: event.id.toString(),
          date: new Date(event.date),
          createdAt: new Date(event.createdAt),
          updatedAt: new Date(event.updatedAt),
        }));
        setEvents(convertedEvents);
      }
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        events: error instanceof Error ? error.message : 'Erreur lors du chargement des événements' 
      }));
    } finally {
      setLoading(prev => ({ ...prev, events: false }));
    }
  }, []);

  // Fonction pour charger les statistiques du tableau de bord
  const loadDashboardStats = useCallback(async () => {
    setLoading(prev => ({ ...prev, dashboard: true }));
    setErrors(prev => ({ ...prev, dashboard: null }));

    try {
      const response = await ApiService.getDashboardStats();
      if (response.error) {
        setErrors(prev => ({ ...prev, dashboard: response.error || null }));
      } else {
        setDashboardStats(response.data);
      }
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        dashboard: error instanceof Error ? error.message : 'Erreur lors du chargement des statistiques' 
      }));
    } finally {
      setLoading(prev => ({ ...prev, dashboard: false }));
    }
  }, []);

  // Fonction pour créer une note
  const createNote = useCallback(async (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await ApiService.createNote(noteData);
      if (response.error) {
        throw new Error(response.error);
      }
      
      // Ajouter la nouvelle note à la liste
      const newNote: Note = {
        ...response.data,
        id: response.data.id.toString(),
        date: new Date(response.data.date),
        createdAt: new Date(response.data.createdAt),
        updatedAt: new Date(response.data.updatedAt),
      };
      
      setNotes(prev => [newNote, ...prev]);
      return newNote;
    } catch (error) {
      throw error;
    }
  }, []);

  // Fonction pour mettre à jour une note
  const updateNote = useCallback(async (id: string, noteData: Partial<Note>) => {
    try {
      const response = await ApiService.updateNote(id, noteData);
      if (response.error) {
        throw new Error(response.error);
      }
      
      // Mettre à jour la note dans la liste
      const updatedNote: Note = {
        ...response.data,
        id: response.data.id.toString(),
        date: new Date(response.data.date),
        createdAt: new Date(response.data.createdAt),
        updatedAt: new Date(response.data.updatedAt),
      };
      
      setNotes(prev => prev.map(note => 
        note.id === id ? updatedNote : note
      ));
      return updatedNote;
    } catch (error) {
      throw error;
    }
  }, []);

  // Fonction pour supprimer une note
  const deleteNote = useCallback(async (id: string) => {
    try {
      const response = await ApiService.deleteNote(id);
      if (response.error) {
        throw new Error(response.error);
      }
      
      // Supprimer la note de la liste (même si response.data est null)
      setNotes(prev => prev.filter(note => note.id !== id));
    } catch (error) {
      throw error;
    }
  }, []);

  // Fonction pour créer un événement
  const createEvent = useCallback(async (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await ApiService.createEvent(eventData);
      if (response.error) {
        throw new Error(response.error);
      }
      
      // Ajouter le nouvel événement à la liste
      const newEvent: Event = {
        ...response.data,
        id: response.data.id.toString(),
        date: new Date(response.data.date),
        createdAt: new Date(response.data.createdAt),
        updatedAt: new Date(response.data.updatedAt),
      };
      
      setEvents(prev => [newEvent, ...prev]);
      return newEvent;
    } catch (error) {
      throw error;
    }
  }, []);

  // Fonction pour mettre à jour un événement
  const updateEvent = useCallback(async (id: string, eventData: Partial<Event>) => {
    try {
      const response = await ApiService.updateEvent(id, eventData);
      if (response.error) {
        throw new Error(response.error);
      }
      
      // Mettre à jour l'événement dans la liste
      const updatedEvent: Event = {
        ...response.data,
        id: response.data.id.toString(),
        date: new Date(response.data.date),
        createdAt: new Date(response.data.createdAt),
        updatedAt: new Date(response.data.updatedAt),
      };
      
      setEvents(prev => prev.map(event => 
        event.id === id ? updatedEvent : event
      ));
      return updatedEvent;
    } catch (error) {
      throw error;
    }
  }, []);

  // Fonction pour supprimer un événement
  const deleteEvent = useCallback(async (id: string) => {
    try {
      const response = await ApiService.deleteEvent(id);
      if (response.error) {
        throw new Error(response.error);
      }
      
      // Supprimer l'événement de la liste (même si response.data est null)
      setEvents(prev => prev.filter(event => event.id !== id));
    } catch (error) {
      throw error;
    }
  }, []);

  // Charger les données au montage du composant
  useEffect(() => {
    loadNotes();
    loadEvents();
    loadDashboardStats();
  }, [loadNotes, loadEvents, loadDashboardStats]);

  return {
    // Données
    notes,
    events,
    dashboardStats,
    
    // États de chargement
    loading,
    
    // États d'erreur
    errors,
    
    // Fonctions de chargement
    loadNotes,
    loadEvents,
    loadDashboardStats,
    
    // Fonctions CRUD pour les notes
    createNote,
    updateNote,
    deleteNote,
    
    // Fonctions CRUD pour les événements
    createEvent,
    updateEvent,
    deleteEvent,
  };
}; 