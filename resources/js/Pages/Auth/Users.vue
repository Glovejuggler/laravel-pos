<script setup>
import { Head, useForm, Link } from '@inertiajs/vue3';
import Modal from '@/Components/Modal.vue';
import TextInput from '@/Components/TextInput.vue';
import InputLabel from '@/Components/InputLabel.vue';
import { ref } from 'vue';

const props = defineProps({
    users: Object,
    errors: Object,
})

// ─── New User ──────────────────────────────────────────────────────────────
const newUserForm = useForm({ name: '', email: '', password: '' })

const submitNewUserForm = () => {
    newUserForm.post(route('users.store'), {
        onSuccess: () => closeModal(),
    })
}

// ─── Edit User ─────────────────────────────────────────────────────────────
const editUserForm = useForm({ name: '', email: '', password: '', id: '' })

const editUser = (user) => {
    editUserForm.name = user.name
    editUserForm.email = user.email
    editUserForm.id = user.id
    showEditUserModal.value = true
}

const submitEditUserForm = () => {
    editUserForm.put(route('users.update', editUserForm.id), {
        onSuccess: () => closeModal(),
    })
}

// ─── Delete User ───────────────────────────────────────────────────────────
const userToDelete = ref(null)

const deleteUser = (user) => {
    if (user.id === 1) return
    userToDelete.value = user
    showDeleteUserModal.value = true
}

// ─── Modal state ───────────────────────────────────────────────────────────
const showNewUserModal = ref(false)
const showEditUserModal = ref(false)
const showDeleteUserModal = ref(false)

const closeModal = () => {
    showNewUserModal.value = false
    showEditUserModal.value = false
    showDeleteUserModal.value = false
    newUserForm.reset()
    editUserForm.reset()
    userToDelete.value = null
}
</script>

<template>

    <Head>
        <title>User Management</title>
    </Head>

    <!-- ─── Page Header ──────────────────────────────────────────────────── -->
    <div class="px-6 lg:px-8 pt-6 pb-2">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 class="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">User Management</h1>
                <p class="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    Manage system users, roles, and access
                </p>
            </div>
            <button
                @click="showNewUserModal = true"
                class="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-colors"
            >
                <i class="bx bx-plus text-lg"></i>
                Add User
            </button>
        </div>
    </div>

    <!-- ─── Users List ──────────────────────────────────────────────────── -->
    <div class="px-6 lg:px-8 py-6">
        <div class="bg-white dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700/60 shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead>
                        <tr class="border-b border-zinc-100 dark:border-zinc-700/50 bg-zinc-50 dark:bg-zinc-800/50">
                            <th class="px-4 py-3 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">User</th>
                            <th class="px-4 py-3 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Email</th>
                            <th class="px-4 py-3 text-right text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-zinc-100 dark:divide-zinc-700/50">
                        <tr
                            v-for="user in users"
                            :key="user.id"
                            class="hover:bg-zinc-50 dark:hover:bg-zinc-700/30 transition-colors"
                        >
                            <td class="px-4 py-3">
                                <div class="flex items-center gap-3">
                                    <div class="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0">
                                        <span class="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                                            {{ (user.name ?? '?')[0].toUpperCase() }}
                                        </span>
                                    </div>
                                    <div>
                                        <p class="font-medium text-zinc-800 dark:text-zinc-200">{{ user.name }}</p>
                                        <p v-if="user.id === 1" class="text-[11px] text-emerald-500 dark:text-emerald-400 font-medium">Administrator</p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-4 py-3 text-zinc-500 dark:text-zinc-400">{{ user.email }}</td>
                            <td class="px-4 py-3 text-right">
                                <div class="flex items-center justify-end gap-1">
                                    <button
                                        @click="editUser(user)"
                                        class="w-8 h-8 inline-flex items-center justify-center rounded-lg text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors"
                                        title="Edit user"
                                    >
                                        <i class="bx bx-edit-alt text-sm"></i>
                                    </button>
                                    <button
                                        v-if="user.id !== 1"
                                        @click="deleteUser(user)"
                                        class="w-8 h-8 inline-flex items-center justify-center rounded-lg text-zinc-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                        title="Delete user"
                                    >
                                        <i class="bx bx-trash text-sm"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Empty state -->
            <div v-if="!users?.length" class="flex flex-col items-center justify-center py-16 text-center">
                <div class="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                    <i class="bx bxs-group text-3xl text-zinc-300 dark:text-zinc-600"></i>
                </div>
                <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-200">No users found</h3>
                <p class="mt-1 text-sm text-zinc-400 dark:text-zinc-500 max-w-sm">
                    There are no users in the system yet. Add your first user to get started.
                </p>
            </div>
        </div>
    </div>

    <!-- ─── New User Modal ──────────────────────────────────────────────── -->
    <Modal max-width="md" :show="showNewUserModal" @close="closeModal">
        <div class="p-6">
            <div class="flex items-center gap-3 mb-5">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                    <i class="bx bx-user-plus text-xl text-emerald-600 dark:text-emerald-400"></i>
                </div>
                <div>
                    <h3 class="text-base font-semibold text-zinc-900 dark:text-zinc-100">New User</h3>
                    <p class="text-sm text-zinc-500 dark:text-zinc-400">Create a new system account</p>
                </div>
            </div>

            <div class="space-y-4">
                <div>
                    <InputLabel for="newUserName" value="Name" />
                    <TextInput
                        id="newUserName"
                        @keyup.enter="submitNewUserForm"
                        class="mt-1.5 w-full block"
                        v-model="newUserForm.name"
                        type="text"
                        placeholder="Full name"
                    />
                    <div v-if="newUserForm.errors.name" class="mt-1 text-sm text-red-500">{{ newUserForm.errors.name }}</div>
                </div>

                <div>
                    <InputLabel for="newUserEmail" value="Email" />
                    <TextInput
                        id="newUserEmail"
                        @keyup.enter="submitNewUserForm"
                        class="mt-1.5 w-full block"
                        v-model="newUserForm.email"
                        type="email"
                        placeholder="email@example.com"
                    />
                    <div v-if="newUserForm.errors.email" class="mt-1 text-sm text-red-500">{{ newUserForm.errors.email }}</div>
                </div>

                <div>
                    <InputLabel for="newUserPassword" value="Password" />
                    <TextInput
                        id="newUserPassword"
                        @keyup.enter="submitNewUserForm"
                        class="mt-1.5 w-full block"
                        v-model="newUserForm.password"
                        type="password"
                        placeholder="Min. 8 characters"
                    />
                    <div v-if="newUserForm.errors.password" class="mt-1 text-sm text-red-500">{{ newUserForm.errors.password }}</div>
                </div>
            </div>

            <div class="mt-6 flex justify-end gap-3">
                <button
                    @click="closeModal"
                    class="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
                >
                    Cancel
                </button>
                <button
                    @click="submitNewUserForm"
                    :disabled="newUserForm.processing"
                    class="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm disabled:opacity-50 transition-colors"
                >
                    <template v-if="newUserForm.processing">
                        <i class="bx bx-loader-alt animate-spin mr-1.5"></i>
                    </template>
                    <template v-else>
                        <i class="bx bx-plus mr-1"></i>
                    </template>
                    Create User
                </button>
            </div>
        </div>
    </Modal>

    <!-- ─── Edit User Modal ─────────────────────────────────────────────── -->
    <Modal max-width="md" :show="showEditUserModal" @close="closeModal">
        <div class="p-6">
            <div class="flex items-center gap-3 mb-5">
                <div class="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center">
                    <i class="bx bx-edit-alt text-xl text-amber-600 dark:text-amber-400"></i>
                </div>
                <div>
                    <h3 class="text-base font-semibold text-zinc-900 dark:text-zinc-100">Edit User</h3>
                    <p class="text-sm text-zinc-500 dark:text-zinc-400">Update user account details</p>
                </div>
            </div>

            <div class="space-y-4">
                <div>
                    <InputLabel for="editUserName" value="Name" />
                    <TextInput
                        id="editUserName"
                        @keyup.enter="submitEditUserForm"
                        class="mt-1.5 w-full block"
                        v-model="editUserForm.name"
                        type="text"
                        placeholder="Full name"
                    />
                    <div v-if="editUserForm.errors.name" class="mt-1 text-sm text-red-500">{{ editUserForm.errors.name }}</div>
                </div>

                <div>
                    <InputLabel for="editUserEmail" value="Email" />
                    <TextInput
                        id="editUserEmail"
                        @keyup.enter="submitEditUserForm"
                        class="mt-1.5 w-full block"
                        v-model="editUserForm.email"
                        type="email"
                        placeholder="email@example.com"
                    />
                    <div v-if="editUserForm.errors.email" class="mt-1 text-sm text-red-500">{{ editUserForm.errors.email }}</div>
                </div>

                <div>
                    <InputLabel for="editUserPassword" value="Password (leave blank to keep current)" />
                    <TextInput
                        id="editUserPassword"
                        @keyup.enter="submitEditUserForm"
                        class="mt-1.5 w-full block"
                        v-model="editUserForm.password"
                        type="password"
                        placeholder="New password"
                    />
                    <div v-if="editUserForm.errors.password" class="mt-1 text-sm text-red-500">{{ editUserForm.errors.password }}</div>
                </div>
            </div>

            <div class="mt-6 flex justify-end gap-3">
                <button
                    @click="closeModal"
                    class="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
                >
                    Cancel
                </button>
                <button
                    @click="submitEditUserForm"
                    :disabled="editUserForm.processing"
                    class="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm disabled:opacity-50 transition-colors"
                >
                    <template v-if="editUserForm.processing">
                        <i class="bx bx-loader-alt animate-spin mr-1.5"></i>
                    </template>
                    <template v-else>
                        <i class="bx bx-check mr-1"></i>
                    </template>
                    Save Changes
                </button>
            </div>
        </div>
    </Modal>

    <!-- ─── Delete User Modal ───────────────────────────────────────────── -->
    <Modal :show="showDeleteUserModal" @close="closeModal" max-width="md">
        <div class="p-6">
            <div class="flex items-center gap-3 mb-5">
                <div class="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
                    <i class="bx bx-trash text-xl text-red-600 dark:text-red-400"></i>
                </div>
                <div>
                    <h3 class="text-base font-semibold text-zinc-900 dark:text-zinc-100">Delete User</h3>
                    <p class="text-sm text-zinc-500 dark:text-zinc-400">This action cannot be undone</p>
                </div>
            </div>
            <div class="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700/50">
                <p class="text-sm text-zinc-700 dark:text-zinc-300">
                    Are you sure you want to delete <strong class="text-zinc-900 dark:text-white">{{ userToDelete?.name }}</strong>?
                </p>
                <p class="mt-1 text-sm text-red-500">This will permanently remove this user account.</p>
            </div>
            <div class="mt-5 flex justify-end gap-3">
                <button
                    @click="closeModal"
                    class="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
                >
                    Cancel
                </button>
                <button
                    @click="$inertia.delete(route('users.destroy', userToDelete?.id), { onSuccess: () => closeModal() })"
                    class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg shadow-sm transition-colors"
                >
                    <i class="bx bx-trash mr-1.5"></i>
                    Delete User
                </button>
            </div>
        </div>
    </Modal>
</template>
