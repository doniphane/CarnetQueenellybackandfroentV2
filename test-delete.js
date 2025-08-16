// Test de suppression
const API_BASE_URL = 'https://localhost:8000/api';

async function testDelete() {
    console.log('🧪 Test de suppression...\n');

    try {
        // D'abord, récupérer une note pour la supprimer
        console.log('1️⃣ Récupération d\'une note...');
        const notesResponse = await fetch(`${API_BASE_URL}/notes`);

        if (notesResponse.ok) {
            const notesData = await notesResponse.json();
            const notes = notesData.member || [];

            if (notes.length > 0) {
                const noteToDelete = notes[0];
                console.log('Note à supprimer:', noteToDelete.title);

                // Tester la suppression
                console.log('\n2️⃣ Test de suppression...');
                const deleteResponse = await fetch(`${API_BASE_URL}/notes/${noteToDelete.id}`, {
                    method: 'DELETE',
                });

                console.log('Status suppression:', deleteResponse.status);
                console.log('Headers:', Object.fromEntries(deleteResponse.headers.entries()));

                if (deleteResponse.ok) {
                    console.log('✅ Suppression réussie!');

                    // Vérifier que la note a bien été supprimée
                    console.log('\n3️⃣ Vérification de la suppression...');
                    const checkResponse = await fetch(`${API_BASE_URL}/notes/${noteToDelete.id}`);
                    console.log('Status vérification:', checkResponse.status);

                    if (checkResponse.status === 404) {
                        console.log('✅ Note bien supprimée (404 retourné)');
                    } else {
                        console.log('❌ Note toujours présente');
                    }
                } else {
                    console.log('❌ Erreur lors de la suppression');
                    const errorText = await deleteResponse.text();
                    console.log('Erreur:', errorText);
                }
            } else {
                console.log('❌ Aucune note trouvée pour le test');
            }
        } else {
            console.log('❌ Erreur lors de la récupération des notes');
        }

    } catch (error) {
        console.error('❌ Erreur:', error);
    }
}

testDelete(); 