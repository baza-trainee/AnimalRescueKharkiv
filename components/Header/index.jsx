import initTranslations from '@/app/i18n';

export const Header = async ({ lng }) => {
    const { t } = await initTranslations(lng, ['header']);
    return (
        <section className=''>
            <div>
                <p>Header</p>
            </div>
        </section>
    )
}