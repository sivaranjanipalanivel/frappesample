frappe.views.TranslationManager = class TranslationManager {
	constructor(opts) {
		Object.assign(this, opts);
		this.make();
	}

	make() {
		this.data = [];
		this.dialog = new frappe.ui.Dialog({
			fields: this.get_fields(),
			title: __('Translate {0}', [this.df.label]),
			no_submit_on_enter: true,
			primary_action_label: __('Update Translations'),
			primary_action:
				(values) => this.update_translations(values)
					.then(() => {
						this.dialog.hide();

						this.data = [];

						frappe.msgprint({
							title: __('Success'),
							message: __('Successfully updated translations'),
							indicator: 'green'
						});
					})
		});

		this.get_translations_data()
			.then(data => {
				this.data.push(...(data || []));
				this.dialog.refresh();
				this.dialog.show();
			});
	}

	get_fields() {
		var fields = [
			{
				label: __('Original Text'),
				fieldname: 'source',
				fieldtype: 'Data',
				read_only: 1,
				bold: 1,
				default: this.source_name
			},
			{
				label: __('Translations'),
				fieldname: 'translation_data',
				fieldtype: 'Table',
				fields: [
					{
						label: 'Language',
						fieldname: 'language',
						fieldtype: 'Link',
						options: 'Language',
						in_list_view: 1,
						columns: 3
					},
					{
						label: 'Translated Text',
						fieldname: 'translation',
						fieldtype: 'Text',
						in_list_view: 1,
						columns: 7
					}
				],
				data: this.data,
				get_data: () => {
					return this.data;
				}
			}
		];
		return fields;
	}

	get_translations_data() {
		return frappe.db.get_list('Translation', {
			fields: ['name', 'language', 'target_name as translation'],
			filters: {
				source_name: strip_html(this.source_name)
			}
		});
	}

	update_translations({ source, translation_data = [] }) {
		const translation_dict = {};
		translation_data.map(row => {
			translation_dict[row.language] = row.translation;
		});

		return frappe.call({
			method: 'ecommerce_business_store.ecommerce_business_store.api.update_translations_for_source',
			btn: this.dialog.get_primary_btn(),
			args: {
				source,
				translation_dict
			}
		}).fail(() => {
			frappe.msgprint({
				title: __('Something went wrong'),
				message: __('Please try again'),
				indicator: 'red'
			});
		});
	}
};

