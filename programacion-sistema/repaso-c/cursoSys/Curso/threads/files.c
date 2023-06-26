#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <dirent.h>
#include <errno.h>

int num_threads = 1, num_files;
char *path, *name, *extension;

void *create_files(void *id_pointer) {
    int id = *(int*)id_pointer;
    int files_to_create = num_files / num_threads;
    int start_file = files_to_create * id;
    int end_file = start_file + files_to_create;

    if (id == num_threads - 1) {
        end_file = num_files;
    }

    char file[256];

    for (int i = start_file; i < end_file; i++) {
        sprintf(file, "%s/%s%03i.%s", path, name, i + 1, extension);
        FILE *f = fopen(file, "w");
        printf("Hilo \033[01;33m%i\033[0m ha creado el fichero \033[01;34m%s\033[0m\n", id, file);
        fclose(f);
    }

    pthread_exit(0);
}

void start_threads() {
    pthread_t threads[num_threads];
    int thread_ids[num_threads];

    for (int i = 0; i < num_threads; i++) {
        thread_ids[i] = i;
        pthread_create(&threads[i], NULL, create_files, (void*)&thread_ids[i]);
    }

    for (int i = 0; i < num_threads; i++) {
        pthread_join(threads[i], NULL);
    }

    exit(0);
}

void eval_args(int argc, char **argv) {
    if (argc < 5) {
        printf("Uso:\n%s ruta nombre extension numero [hilos]\n", argv[0]);
        exit(-1);
    }

    DIR *dir = opendir(argv[1]);
    if (errno == ENOENT) {
        printf("El directorio %s no existe\n", argv[1]);
        exit(-1);
    }
    closedir(dir);

    path = argv[1];
    name = argv[2];
    extension = argv[3];
    num_files = atoi(argv[4]);

    if (argc == 6) {
        num_threads = atoi(argv[5]);
    }
}

int main(int argc, char **argv) {
    eval_args(argc, argv);
    start_threads();
}
