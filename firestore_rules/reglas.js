rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /clientes/{clienteId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null 
                    && request.resource.data.keys().hasAll([
                        'nombres', 
                        'apellidos', 
                        'email', 
                        'celular'
                      ]);
      allow update, delete: if request.auth != null 
                            && request.auth.uid == resource.data.userId;
    }
  }
}