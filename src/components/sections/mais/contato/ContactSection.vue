<script setup>
import { ref, computed } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const form = ref({
  name: '',
  email: '',
  reason: '',
  otherReason: '',
  jobTitle: '',
  message: ''
})

const reasonOptions = [
  'Agregar à galeria',
  'Informações',
  'Dúvidas',
  'Outro'
]

const isSubmitting = ref(false)
const submitStatus = ref(null)

const isFormValid = computed(() => {
  if (form.value.reason === 'Outro' && !form.value.otherReason.trim()) {
    return false
  }
  return form.value.name && form.value.email && form.value.reason && form.value.message
})

const handleSubmit = async () => {
  if (!isFormValid.value) return

  isSubmitting.value = true
  submitStatus.value = null

  const finalReason = form.value.reason === 'Outro' 
    ? `Outro: ${form.value.otherReason}` 
    : form.value.reason

  const payload = {
    name: form.value.name,
    email: form.value.email,
    subject: `Contato Site: ${finalReason}`,
    job: form.value.jobTitle || 'Não informado',
    message: form.value.message
  }

  try {
    const response = await fetch('https://formspree.io/f/xjgbgeeq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (response.ok) {
      submitStatus.value = 'success'
      form.value = { name: '', email: '', reason: '', otherReason: '', jobTitle: '', message: '' }
    } else {
      throw new Error('Erro no envio')
    }
  } catch (error) {
    console.error(error)
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="contact-page">
    <div class="container">
      <div class="info-column">
        <h1 class="page-title">Fale Conosco</h1>
        <p class="page-description">
          Tem alguma foto histórica da família Fragoso? Quer agendar uma visita guiada com o IFC? 
          Ou apenas tirar uma dúvida sobre o projeto?
        </p>
        <p class="page-description">
          Preencha o formulário e entraremos em contato o mais breve possível.
        </p>

        <div class="direct-contact">
          <h3>E-mail Direto</h3>
          <a href="mailto:cemiterio.caboclo.ifc@gmail.com" class="email-link">
            cemiterio.caboclo.ifc@gmail.com
          </a>
        </div>
      </div>

      <div class="form-column">
        <form @submit.prevent="handleSubmit" class="contact-form">
        
          <div class="form-group">
            <label for="name">Seu nome *</label>
            <input 
              id="name" 
              v-model="form.name" 
              type="text" 
              placeholder="Como prefere ser chamado?"
              required 
            />
          </div>

          <div class="form-group">
            <label for="email">Seu e-mail *</label>
            <input 
              id="email" 
              v-model="form.email" 
              type="email" 
              placeholder="exemplo@email.com"
              required 
            />
          </div>

          <div class="form-group">
            <label for="job">Cargo / Ocupação <span class="optional">(opcional)</span></label>
            <input 
              id="job" 
              v-model="form.jobTitle" 
              type="text" 
              placeholder="Ex: Professor, Historiador, Estudante..."
            />
          </div>

          <div class="form-group">
            <label for="reason">Motivo do contato *</label>
            <select id="reason" v-model="form.reason" required>
              <option value="" disabled>Selecione uma opção</option>
              <option v-for="opt in reasonOptions" :key="opt" :value="opt">
                {{ opt }}
              </option>
            </select>
          </div>

          <Transition name="slide-down">
            <div v-if="form.reason === 'Outro'" class="form-group highlight-bg">
              <label for="other">Especifique o motivo *</label>
              <input 
                id="other" 
                v-model="form.otherReason" 
                type="text" 
                placeholder="Sobre o que você gostaria de falar?"
                required
              />
            </div>
          </Transition>

          <div class="form-group full-width">
            <label for="message">Sua mensagem *</label>
            <textarea 
              id="message" 
              v-model="form.message" 
              rows="5" 
              placeholder="Escreva aqui sua mensagem..."
              required
            ></textarea>
          </div>

          <div class="form-actions">
            <BaseButton 
              variant="primary" 
              type="submit" 
              :disabled="isSubmitting"
              class="submit-btn"
            >
              {{ isSubmitting ? 'Enviando...' : 'Enviar Mensagem' }}
            </BaseButton>
          </div>

          <Transition name="fade">
            <div v-if="submitStatus === 'success'" class="feedback success">
              Mensagem enviada com sucesso! Obrigado pelo contato.
            </div>
          </Transition>
          
          <Transition name="fade">
            <div v-if="submitStatus === 'error'" class="feedback error">
              Ops! Algo deu errado. Tente enviar diretamente pelo e-mail.
            </div>
          </Transition>

        </form>
      </div>

    </div>
  </section>
</template>

<style scoped>
.contact-page {
  padding: 4rem 1rem;
  background-color: var(--color-off-white);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
}

.page-title {
  font-size: 3rem;
  color: var(--color-brown);
  margin-bottom: 1.5rem;
  line-height: 1.1;
}

.page-description {
  color: #555;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.direct-contact {
  margin-top: 3rem;
  padding: 2rem;
  background-color: var(--color-white);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

.direct-contact h3 {
  margin: 0 0 0.5rem 0;
  color: var(--color-green);
}

.email-link {
  color: var(--color-brown);
  font-weight: 700;
  text-decoration: none;
  font-size: 1.1rem;
}

.email-link:hover {
  text-decoration: underline;
}

.contact-form {
  background-color: var(--color-white);
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.full-width, .form-actions {
  grid-column: 1 / -1;
}

.highlight-bg {
  grid-column: 1 / -1;
  background-color: #f9fdf9;
  padding: 1rem;
  border-radius: 8px;
  border: 1px dashed var(--color-green);
}

label {
  font-weight: 700;
  color: var(--color-brown);
  font-size: 0.9rem;
}

.optional {
  font-weight: 400;
  color: #999;
  font-size: 0.8rem;
}

input, select, textarea {
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  background-color: #fafafa;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--color-green);
  box-shadow: 0 0 0 3px rgba(117, 192, 102, 0.2);
  background-color: white;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
}

.feedback {
  grid-column: 1 / -1;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 700;
  text-align: center;
}

.success {
  background-color: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #c8e6c9;
}

.error {
  background-color: #ffebee;
  color: #c62828;
  border: 1px solid #ffcdd2;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  max-height: 100px;
  opacity: 1;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.5s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 900px) {
  .container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 600px) {
  .contact-form {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }
}
</style>